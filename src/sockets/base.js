/**
 * Created by ricardomendes on 06/10/15.
 */
var services = require('../services/services.js');

module.exports = function (io) {
    'use strict';

    io.sockets.on('connection', function (socket) {
        /**
         * Create new Socket
         * @return     {object} create new Socket
         */
        socket.on('add', function () {
            socket.room = "MessageBroker";
            socket.join(socket.room);
        });

        /**
         * Convert NodeRed to XML
         * @param      {Object}   dataJSON
         * @return     {object} converted data XML
         */
        socket.on('convertNodeRedtoXML', function (dataJSON) {
            var json = JSON.parse(dataJSON);
            io.sockets.in(socket.room).emit('updateConvertXML', services.convertNodeRedtoXML(json));
        });

        /**
         * Convert NodeRed to DRL
         * @param      {Object}   dataJSON
         * @return     {object} converted data DRL
         */
        socket.on('convertNodeRedtoDRL', function (dataJSON) {
            var json = JSON.parse(dataJSON);
            io.sockets.in(socket.room).emit('updateConvertDRL', services.convertNodeRedtoDRL(json));
        });

        /**
         * Disconnect socket
         */
        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });
    });
};