/**
 * Created by ricardomendes on 06/10/15.
 */
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
         * Convert data
         * @param      {Object}   from
         * @param      {String}   typeFrom
         * @param      {String}   typeTo
         * @return     {object} converted data
         */
        socket.on('sendConvert', function (from, typeFrom, typeTo) {
            io.sockets.in(socket.room).emit('updateConvert', {from: from, typeFrom:typeFrom, typeTo:typeTo, newData: from});
        });

        /**
         * Disconnect socket
         */
        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });
    });
};