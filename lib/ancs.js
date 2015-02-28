var events = require('events');
var util = require('util');

var noble = require('noble');

var Notification = require('./notification');

// https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html#//apple_ref/doc/uid/TP40013460-CH1-SW7
var SERVICE_UUID                = '7905f431b5ce4e99a40f4b1e122d00d0';

var NOTIFICATION_SOURCE_UUID    = '9fbf120d630142d98c5825e699a21dbd';
var CONTROL_POINT_UUID          = '69d1d8f345e149a898219bbdfdaad9d9';
var DATA_SOURCE_UUID            = '22eac6e924d64bb5be44b36ace7c7bfb';

var ANCS = function(peripheral) {
  this._peripheral = peripheral;
  this._characteristics = {};
  this._notifications = {};

  this._lastUid = null;

  this.uuid = peripheral.uuid;

  this._peripheral.on('disconnect', this.onDisconnect.bind(this));
};

util.inherits(ANCS, events.EventEmitter);

ANCS.discover = function(callback) {
  noble.once('stateChange', function() {
    var onDiscover = function(peripheral) {

      peripheral.connect(function() {
        peripheral.discoverServices([SERVICE_UUID], function(error, services) {
          peripheral.disconnect(function() {
            if (services.length) {
              var ancs = new ANCS(peripheral);

              callback(ancs);
            }
          });
        });
      });
    };

    noble.on('discover', onDiscover);
    noble.startScanning();
  });
};

ANCS.prototype.onDisconnect = function() {
  this.emit('disconnect');
};

ANCS.prototype.connect = function(callback) {
  this._peripheral.connect(callback);
};

ANCS.prototype.disconnect = function(callback) {
  this._peripheral.disconnect(callback);
};

ANCS.prototype.discoverServicesAndCharacteristics = function(callback) {
  this._peripheral.discoverSomeServicesAndCharacteristics([SERVICE_UUID], [], function(error, services, characteristics) {
    for (var i in characteristics) {
      this._characteristics[characteristics[i].uuid] = characteristics[i];
    }

    this._characteristics[NOTIFICATION_SOURCE_UUID].on('read', this.onNotification.bind(this));
    this._characteristics[DATA_SOURCE_UUID].on('read', this.onData.bind(this));

    this._characteristics[NOTIFICATION_SOURCE_UUID].notify(true);
    this._characteristics[DATA_SOURCE_UUID].notify(true);

    callback();
  }.bind(this));
};

ANCS.prototype.onNotification = function(data) {
  // console.log('notification ' + data.toString('hex'));

  var notification = new Notification(this, data);

  this._notifications[notification.uid] = notification;

  this.emit('notification', notification);
};

ANCS.prototype.onData = function(data) {
  // console.log('data ' + data.toString('hex'));

  var commandId = data.readUInt8(0);

  if (commandId === 0x00) {
    var uid = data.readUInt32LE(1);
    var notificationData = data.slice(5);

    this._lastUid = uid;

    this._notifications[uid].emit('data', notificationData);
  } else {
    if (this._lastUid) {
      this._notifications[this._lastUid].emit('data',data);
    }
  }
};

ANCS.prototype.requestNotificationAttribute = function(uid, attributeId, maxLength) {
  var buffer = new Buffer(maxLength ? 8 : 6);

  buffer.writeUInt8(0x00, 0);
  buffer.writeUInt32LE(uid, 1);
  buffer.writeUInt8(attributeId, 5);
  if (maxLength) {
    buffer.writeUInt16LE(maxLength, 6);
  }

  this._characteristics[CONTROL_POINT_UUID].write(buffer, false);
};

module.exports = ANCS;
