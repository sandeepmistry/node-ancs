ancs
=========

A node.js lib to access the [Apple Notification Center Service (ANCS)](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Introduction/Introduction.html)

Install
-------

    npm install ancs

Prerequisites
-------------

 * iOS 7 device with an app in peripheral mode which exposes ANCS
 * your iOS device will ask to be paired with your Mac

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
   * event (one of):
     * added
     * modified
     * removed
   * flags (array):
     * silent
     * important
   * category (one of):
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

__Operations for 'added' or 'modified' notifications (event property)__

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

 * attributes has the following properties
   * appIdentifier
   * title
   * subtitle
   * message
   * date
