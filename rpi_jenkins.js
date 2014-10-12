var gpio = require("pi-gpio");
var jenkinsapi = require('jenkins-api');
var config = require('./config')

//more info https://github.com/jansepar/node-jenkins-api

var jenkins = jenkinsapi.init(config.jenkins.host);
var backpackBeaconPin = 7;
var lastResult = 'SUCCESS';
var result = 'SUCCESS';

//TODO: run the first check before the setInterval


setInterval(function () {
    

	jenkins.all_jobs(function(err, data) {
	  if (err){ return console.log(err); }
	  
	  data.forEach(function(item, index) {
		jenkins.last_build_info(item.name, function(err, data) {
		  if (err){ return console.log(err); }  //TODO: Have a different light turn on... :-)
		  //console.log(item.name + "--" + data['result'])
		  if (data['result'] != 'SUCCESS') {
		  	result = 'FAILURE'
		  }
		});		

	  });

	});

	if (lastResult != result) {
	  	lastResult = result;
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
		};



}, 10000);


