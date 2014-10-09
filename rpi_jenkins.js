var gpio = require("pi-gpio");
var jenkinsapi = require('jenkins-api');


//using https://github.com/jansepar/node-jenkins-api


var jenkins = jenkinsapi.init("http://RaspPi:steel2000@macmini001:8080");
var backpackBeaconPin = 7;
var lastResult = 'SUCCESS'

//TODO: run the first check before the setInterval

setInterval(function () {
    
	jenkins.last_build_info('backpackTracker-Develop', function(err, data) {
	  if (err){ return console.log(err); } //what I shoudl do here is have a different light turn on... :-)

	  //parsedData = JSON.parse(data);
	  //console.log(data['result']);
	  //console.log(data);
	  var result = data['result'];
	  if (lastResult != result) {
	  	lastResult = result;
		  //console.log(result=='SUCCESS');
		  if (result == 'SUCCESS') {
			gpio.open(backpackBeaconPin, "output", function(err) {     // Open pin 16 for output
	    		gpio.write(backpackBeaconPin, 0, function() {          // Set pin 16 high (1) (1 is on and 0 is off - seems logical)
	        		gpio.close(backpackBeaconPin);                     // Close pin 16
	    			});
	    		});
		  } else {
			gpio.open(backpackBeaconPin, "output", function(err) {     // Open pin 16 for output
	    		gpio.write(backpackBeaconPin, 1, function() {          // Set pin 16 high (1) (1 is on and 0 is off - seems logical)
	        		gpio.close(backpackBeaconPin);                     // Close pin 16
	    			});
	    		});
		  }
		}
	});

}, 10000);


