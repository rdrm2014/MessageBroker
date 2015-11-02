/**
 * Created by ricardomendes on 06/10/15.
 */

var config = require('./config/myConfig.js');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

require('./sockets/base')(io);

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://" + config.myconfig.serverMQTT.ipaddr);

require('./mqtt/base')(client);

var routes = require('./routes/routes.js');

//Server IP
app.set("ipaddr", config.myconfig.serverAPI.ipaddr);

//Server Port
app.set('port', process.env.PORT || config.myconfig.serverAPI.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/api/convertNodeRedtoXML', routes.api.convertNodeRedtoXML);
app.get('/api/convertNodeRedtoDRL', routes.api.convertNodeRedtoDRL);

server.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});