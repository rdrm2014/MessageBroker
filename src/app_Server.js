/**
 * Created by ricardomendes on 06/10/15.
 */

var src =  process.cwd() + "/src/";
var config = require(src + 'config/config');
//var config = require('./config/myConfig.js');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

require('./sockets/base')(io);

var mqtt = require("mqtt");
var client = mqtt.connect(config.get('serverMQTT:uri'));

require('./mqtt/base')(client);

var routes = require(src + 'routes/routes');

//Server IP
app.set("ipaddr", config.get('serverAPI:ipaddr'));

//Server Port
app.set('port', process.env.PORT || config.get('serverAPI:port'));
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