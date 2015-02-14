# ancs

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sandeepmistry/node-ancs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A node.js lib to access the [Apple Notification Center Service (ANCS)](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Introduction/Introduction.html)

## Install

```sh
npm install ancs
```

## Prerequisites

 * iOS 7 device with an app in peripheral mode which exposes ANCS
 * your iOS device will ask to be paired with your Mac

## Usage

```javascript
var ANCS = require('ancs');
```

### Discover

```javascript
ANCS.discover(callback(ancs));
```

### Connect

```javascript
ancs.connect(callback);
```

### Disconnect

```javascript
ancs.disconnect(callback);
```

### Notification Event

```javascript
ancs.on('notification', function(notification) {
    // ...
});
```

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

### Operations for 'added' or 'modified' notifications (event property)

#### Read App Identifier

```javascript
notification.readAppIdentifier(function(appIdentifier) {
  // ...
});
```

#### Read Title

```javascript
notification.readTitle(function(title) {
  // ...
});
```

#### Read Subtitle

```javascript
notification.readSubtitle(function(subtitle) {
  // ...
});
```

#### Read Message

```javascript
notification.readMessage(function(message) {
  // ...
});
```

#### Read Date
```javascript
notification.readDate(function(date) {
  // ...
});
```

#### Read All Attributes
```javascript
notification.readAttributes(function(attributes) {
  // ...
});
```
 * attributes has the following properties
   * appIdentifier
   * title
   * subtitle
   * message
   * date

[![Analytics](https://ga-beacon.appspot.com/UA-56089547-1/sandeepmistry/node-ancs?pixel)](https://github.com/igrigorik/ga-beacon)
