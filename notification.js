var EVENT_ID = [
  'added',
  'modified',
  'removed'
];

var CATEGORY_ID = [
  'other',
  'incomingCall',
  'missedCall',
  'voicemail',
  'social',
  'schedule',
  'email',
  'news',
  'healthAndFitness',
  'businessAndFinance',
  'location',
  'entertianment'
];

var ATTRIBUTE_ID = [
  'appIdentifier',
  'title',
  'subtitle',
  'message',
  'messageSize',
  'date'
];

var Notification = function(data) {
  var eventId = data.readUInt8(0);
  var eventFlags = data.readUInt8(1);
  var categoryId = data.readUInt8(2);
  var categoryCount = data.readUInt8(3);
  var uid = data.readUInt32LE(4);

  this.event = EVENT_ID[eventId];
  this.flags = [];

  if (eventFlags & 1) {
    this.flags.push('silent');
  }

  if (eventFlags & 1) {
    this.flags.push('important');
  }

  this.category = CATEGORY_ID[categoryId];
  this.categoryCount = categoryCount;

  this.uid = uid;
};

Notification.prototype.getAttributes = function(getAttributes, callback) {

};

Notification.APP_IDENTIFIER = 'appIdentifier';
Notification.TITLE = 'title';
Notification.SUBTITLE = 'subtitle';
Notification.MESSAGE = 'message';
Notification.MESSAGE_SIZE = 'messageSize';
Notification.DATE = 'date';

/*
CommandIDGetNotificationAttributes = 0,
CommandIDGetAppAttributes = 1,
*/


module.exports = Notification;
