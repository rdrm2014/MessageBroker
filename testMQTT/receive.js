/**
 * Created by ricardomendes on 30/09/15.
 */
var mqtt = require("mqtt");

var client = mqtt.connect("mqtt://192.168.160.122");

var topic;

if(process.argv.indexOf("-t") != -1){
    topic = process.argv[process.argv.indexOf("-t") + 1];
}

client.subscribe(topic);

client.on('message', function(topic, message) {
    console.log(" %s:%s", topic, message);
});