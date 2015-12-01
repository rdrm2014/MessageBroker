/**
 * Created by ricardomendes on 06/10/15.
 */
var services = require('../services/services.js');

module.exports = function (client) {
    'use strict';

    client.subscribe("MessageBroker");

    /**
     * Converte um diagrama de Node-Red e disponibiliza nos canais MessageBroker_RuleXML (XML) e MessageBroker_RuleDRL (DRL)
     * @param      {Object}   dataJSON
     * @return     {object} dados convertidos
     */
    client.on('message', function(topic, dataJSON) {
        try{
            console.log(dataJSON.toString());
            var json = JSON.parse(dataJSON.toString());
            client.publish('MessageBroker_RuleXML', JSON.stringify(services.convertNodeRedtoXML(json)));
            client.publish('MessageBroker_RuleDRL', JSON.stringify(services.convertNodeRedtoDRL(json)));
            client.publish('rules', JSON.stringify(services.convertNodeRedtoDRL(json)));
        }catch(e){
            console.log("ERROR"); //error in the above string(in this case,yes)!
        }
    });
};