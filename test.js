var ANCS = require('./index');


ANCS.discover(function(ancs) {
  console.log('discovered');
  ancs.connect(function() {
    console.log('connected');
    ancs.discoverServicesAndCharacteristics(function() {

    });

    ancs.on('notification', function(notification) {
      console.log(notification);
    });
  });
});
