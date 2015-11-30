/**
 * Created by ricardomendes on 30/09/15.
 */
var mqtt = require("mqtt");

var client = mqtt.connect("mqtt://192.168.160.122");

var topic;
var message;

if(process.argv.indexOf("-t") != -1){
    topic = process.argv[process.argv.indexOf("-t") + 1];
}
if(process.argv.indexOf("-m") != -1){
    message = process.argv[process.argv.indexOf("-m") + 1];
}
var args = {
    qos: 1, // 0, 1, or 2
    retain: true // or true
};

client.publish(topic, new Buffer(message), args, function() {
    console.log('done!');
});
client.end();