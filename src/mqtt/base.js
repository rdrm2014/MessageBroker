/**
 * Created by ricardomendes on 06/10/15.
 */
var services = require('../services/services.js');

module.exports = function (client) {
    'use strict';

    client.subscribe("MessageBroker");

    /**
     * Parse data
     * @param      {Object}   dataJSON
     * @return     {object} converted data
     */
    client.on('message', function(topic, dataJSON) {
        var json = JSON.parse(dataJSON);
        client.publish('rulesXML', JSON.stringify(services.convertNodeRedtoXML(json)));
        client.publish('rulesDRL', JSON.stringify(services.convertNodeRedtoDRL(json)));
    });
};