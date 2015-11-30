/**
 * Created by ricardomendes on 06/10/15.
 */
var services = require('../services/services.js');

module.exports = function (io) {
    'use strict';

    io.sockets.on('connection', function (socket) {
        /**
         * Cria um novo Socket
         * @return     {object} cria um novo Socket
         */
        socket.on('add', function () {
            socket.room = "MessageBroker";
            socket.join(socket.room);
        });

        /**
         * Converte um diagrama de Node-Red para XML
         * @param      {Object}   dataJSON
         * @return     {object} dados convertidos para XML
         */
        socket.on('convertNodeRedtoXML', function (dataJSON) {
            var json = JSON.parse(dataJSON);
            io.sockets.in(socket.room).emit('updateConvertXML', services.convertNodeRedtoXML(json));
        });

        /**
         * Converte um diagrama de Node-Red para DRL
         * @param      {Object}   dataJSON
         * @return     {object} dados convertidos para DRL
         */
        socket.on('convertNodeRedtoDRL', function (dataJSON) {
            var json = JSON.parse(dataJSON);
            io.sockets.in(socket.room).emit('updateConvertDRL', services.convertNodeRedtoDRL(json));
        });

        /**
         * Fecha a ligação do Socket
         */
        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });
    });
};