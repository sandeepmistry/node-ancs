ancs
=========

A node.js lib to access the [Apple Notification Center Service (ANCS)](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Introduction/Introduction.html)

Install
-------

    npm install ancs

Prerequisites
-------------

 * iOS 7 device with an app in peripheral mode which exposes ANCS

Usage
-----

    var ANCS = require('ancs');

__Discover__

    ANCS.discover(callback(ancs));

__Connect__

    ancs.connect(callback);

__Disconnect__

    ancs.disconnect(callback);

__Notification Events__

    ancs.on('notification', function(notification) {
        ...
    });

 * notification has the following properties
   * event
     * added
     * modified
     * removed
   * flags (array):
     * silent
     * important
   * category
     * other
     * incomingCall
     * missedCall
     * voicemail
     * schedule
     * email
     * other
     * news
     * healthAndFitness
     * businessAndFinance
     * location
     * entertianment
   * categoryCount
   * uid

__Notification__

Operations for 'added' or 'modified' notifications (event property):

Read App Identifier

    notification.readAppIdentifier(function(appIdentifier) {
      ...
    });

Read Title

    notification.readTitle(function(title) {
      ...
    });

Read Subtitle

    notification.readSubtitle(function(subtitle) {
      ...
    });

Read Message

    notification.readMessage(function(message) {
      ...
    });

Read Date

    notification.readDate(function(date) {
      ...
    });

Read All Attributes

    notification.readAttributes(function(attributes) {
      ...
    });

