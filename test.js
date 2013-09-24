var ANCS = require('./index');


ANCS.discover(function(ancs) {
  console.log('discovered');
  ancs.connect(function() {
    console.log('connected');
    ancs.discoverServicesAndCharacteristics(function() {
      console.log('services and characteristics discovered');
    });

    ancs.on('notification', function(notification) {
      console.log('notification: ' + notification);

      if (notification.event !== 'removed') {
        // notification.readAppIdentifier(function(appIdentifier) {
        //   console.log('\tappIdentifier = ' + appIdentifier);
        // });

        // notification.readTitle(function(title) {
        //   console.log('\ttitle = ' + title);
        // });

        // notification.readSubtitle(function(subtitle) {
        //   console.log('\tsubtitle = ' + subtitle);
        // });

        // notification.readMessage(function(message) {
        //   console.log('\tmessage = ' + message);
        // });

        // notification.readDate(function(date) {
        //   console.log('\tdate = ' + date);
        // });

        notification.readAttributes(function(attributes) {
          console.log(attributes);
        });
      }
    });
  });
});
