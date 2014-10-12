# Raspberry Pi Jenkins Interface

Requires jenkins-api 
Requires gpio

Checks all projects on a Jenkins instance and then uses the sainsmart interface
/ gpio to flip a relay - to turn on a light - or whatever you want.

You will need to add a config.js to the project with your jenkins host information...

```
var config = {}

config.jenkins = {};

config.jenkins.host = "http://username:password@:8080"

module.exports = config;
```