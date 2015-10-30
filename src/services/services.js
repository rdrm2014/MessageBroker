/**
 * Created by ricardomendes on 06/10/15.
 */
var config = require('../config/myConfig.js');

/**
 * Convert JSON NodeRed to XML
 * @param      {JSON}   json
 * @return     {XML}   xml
 */
exports.convertNodeRedtoXML = function (json) {
    var ruleName = json.name;
    var DirectedGraph = require('graph-json').DG;

    var builder = require('xmlbuilder');

    var nodered = json.data;

    var graph = new DirectedGraph();

    for (var i in nodered) {
        var node = nodered[i];
        if(node.func){
            graph.addNode(node.id, {name:node.name, type:node.type, func: node.func});
        } else{
            graph.addNode(node.id, {name:node.name, type:node.type});
        }
        if(node.wires[0]){
            for (var a in node.wires[0]) {

                console.log(node.wires[0][a]);
                graph.addEdge(node.id + '->' + node.wires[0][a], node.id, node.wires[0][a]);
            }
        }
    }

    var sortedGraph = graph.tSort();

    var node1 = graph.getNode(sortedGraph[0]);
    var node2 = graph.getNode(sortedGraph[1]);
    var node3 = graph.getNode(sortedGraph[2]);

    console.log(JSON.stringify(node3));

    //var name = "Hello World";
    var expr1 = node1.data.func;//"status == Message.HELLO";
    var expr2 = node3.data.func;//"myMessage : message";
    var rhs = node2.data.func;//'System.out.println( myMessage ); m.setMessage( "Goodbye cruel world" ); m.setStatus( Message.GOODBYE ); update( m );';

    var xml = builder.create('package').att('name',"com.sample").att('xmlns', "http://drools.org/drools-5.2").att('xmlns:xs', "http://www.w3.org/2001/XMLSchema-instance").att('xs:schemaLocation', "http://drools.org/drools-5.2 drools.org/drools-5.2.xsd");

    xml.ele('import', {'name': "com.sample.DroolsTest.Message"});

    var ruleElem = xml.ele('rule', {'name': ruleName });
    var lhsElem = ruleElem.ele('lhs');
    var patternElem = lhsElem.ele('pattern', {'object-type': "Message" });

    patternElem.ele('expr', {},expr1);
    patternElem.ele('expr', {},expr2);

    ruleElem.ele('rhs', {}, rhs);

    var xmlString = xml.end({ pretty: true});

    return {name: ruleName, rule: xmlString};


    //return '<?xml version="1.0" encoding="UTF-8"?> <package name="com.sample" xmlns="http://drools.org/drools-5.2" xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" xs:schemaLocation="http://drools.org/drools-5.2 drools.org/drools-5.2.xsd">' +
    //    '<import name="com.sample.DroolsTest.Message" />' +
    //    '<rule name="Hello World">' +
    //    '<lhs><pattern identifier="m" object-type="Message" >' +
    //    '<expr>' +
    //    'status == Message.HELLO' +
    //    '</expr>' +
    //    '<expr>' +
    //    'myMessage : message' +
    //    '</expr>' +
    //    '</pattern>' +
    //    '</lhs><rhs>System.out.println( myMessage );' +
    //    'm.setMessage( "Goodbye cruel world" );' +
    //    'm.setStatus( Message.GOODBYE );' +
    //    'update( m );' +
    //    '</rhs>' +
    //    '</rule><rule name="GoodBye">' +
    //    '<lhs><pattern object-type="Message" >' +
    //    '<expr>' +
    //    'status == Message.GOODBYE' +
    //    '</expr>' +
    //    '<expr>' +
    //    'myMessage : message' +
    //    '</expr>' +
    //    '</pattern>' +
    //    '</lhs><rhs>System.out.println( myMessage );' +
    //    '</rhs>' +
    //    '</rule>' +
    //    '</package>';
};

/**
 * Convert JSON NodeRed to DRL
 * @param      {JSON}   json
 * @return     {DRL}   drl
 */
exports.convertNodeRedtoDRL = function (json) {
    var ruleName = json.name;
    var DirectedGraph = require('graph-json').DG;

    var nodered = json.data;

    var graph = new DirectedGraph();

    for (var i in nodered) {
        var node = nodered[i];
        if(node.func){
            graph.addNode(node.id, {name:node.name, type:node.type, func: node.func});
        } else{
            graph.addNode(node.id, {name:node.name, type:node.type});
        }
        if(node.wires[0]){
            for (var a in node.wires[0]) {

                console.log(node.wires[0][a]);
                graph.addEdge(node.id + '->' + node.wires[0][a], node.id, node.wires[0][a]);
            }
        }
    }

    var sortedGraph = graph.tSort();

    var node1 = graph.getNode(sortedGraph[0]);
    var node2 = graph.getNode(sortedGraph[1]);
    var node3 = graph.getNode(sortedGraph[2]);

    //var name = "Hello World";
    var expr1 = node1.data.func;//"status == Message.HELLO";
    var expr2 = node3.data.func;//"myMessage : message";
    var rhs = node2.data.func;//'System.out.println( myMessage ); m.setMessage( "Goodbye cruel world" ); m.setStatus( Message.GOODBYE ); update( m );';

    var resultDRL = "package com.sample\n" +
        "import com.sample.DroolsTest.Message;\n" +
        "rule " + ruleName + "\n" +
        "when\n" +
        "m : Message( " + expr1 + ","+ expr2 + ")\n" +
        "then\n" + rhs + "\n" +
        "end";

    return {name: ruleName, rule: resultDRL};

    //return 'package com.sample\n' +
    //    'import com.sample.DroolsTest.Message;\n' +
    //    'rule "Hello World"\n' +
    //    'when\n' +
    //    'm : Message( status == Message.HELLO, myMessage : message )\n' +
    //    'then\n' +
    //    'System.out.println( myMessage );\n' +
    //    'm.setMessage( "Goodbye cruel world" );\n' +
    //    'm.setStatus( Message.GOODBYE );\n' +
    //    'update( m );\n' +
    //    'end\n' +
    //    'rule "GoodBye"\n' +
    //    'when\n' +
    //    'Message( status == Message.GOODBYE, myMessage : message )\n' +
    //    'then\n' +
    //    'System.out.println( myMessage );\n' +
    //    'end';
};
//
///**
// * Convert XML to JSON
// * @param      {XML}   from
// * @return     {JSON}   to
// */
//exports.convertXMLtoJSON = function (from) {
//    return [{
//        "id": "f41ae407.7dcf88",
//        "type": "inject",
//        "name": "AAAAAAA",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 171,
//        "y": 73,
//        "z": "7451ae03.b8f48",
//        "wires": [["fc79caa1.b4349"]]
//    }, {
//        "id": "fc79caa1.b4349",
//        "type": "function",
//        "name": "",
//        "func": "TESTE\nreturn msg;",
//        "outputs": 1,
//        "noerr": 0,
//        "x": 354,
//        "y": 118,
//        "z": "7451ae03.b8f48",
//        "wires": [["5c3ab542.ebbf24"]]
//    }, {
//        "id": "5c3ab542.ebbf24",
//        "type": "debug",
//        "name": "XXXXXXX",
//        "active": true,
//        "console": "false",
//        "complete": "payload",
//        "x": 575,
//        "y": 196,
//        "z": "7451ae03.b8f48",
//        "wires": []
//    }, {
//        "id": "aa6a532f.edd7b",
//        "type": "inject",
//        "name": "CCCCCC",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 163,
//        "y": 235,
//        "z": "7451ae03.b8f48",
//        "wires": [["1b6e20b0.e270e7"]]
//    }, {
//        "id": "1b6e20b0.e270e7",
//        "type": "function",
//        "name": "",
//        "func": "TESTE\nreturn msg;",
//        "outputs": 1,
//        "noerr": 0,
//        "x": 363,
//        "y": 280,
//        "z": "7451ae03.b8f48",
//        "wires": [["5c3ab542.ebbf24"]]
//    }, {
//        "id": "8946af04.002f08",
//        "type": "inject",
//        "name": "BBBBBBB",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 168,
//        "y": 142,
//        "z": "7451ae03.b8f48",
//        "wires": [["fc79caa1.b4349"]]
//    }, {
//        "id": "dafe7ad3.5ce928",
//        "type": "inject",
//        "name": "DDDDDD",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 167,
//        "y": 326,
//        "z": "7451ae03.b8f48",
//        "wires": [["1b6e20b0.e270e7"]]
//    }];
//};
//
///**
// * Generates a person information string based on input.
// *
// * @param {string | {name: string, age: number | date}} name Name or person object
// * @param {{separator: string} =} options An options object
// * @return {string} The constructed information string
// */
//exports.convertXMLtoDRL = function (from) {
//    return 'package com.sample\n' +
//        'import com.sample.DroolsTest.Message;\n' +
//        'rule "Hello World"\n' +
//        'when\n' +
//        'm : Message( status == Message.HELLO, myMessage : message )\n' +
//        'then\n' +
//        'System.out.println( myMessage );\n' +
//        'm.setMessage( "Goodbye cruel world" );\n' +
//        'm.setStatus( Message.GOODBYE );\n' +
//        'update( m );\n' +
//        'end\n' +
//        'rule "GoodBye"\n' +
//        'when\n' +
//        'Message( status == Message.GOODBYE, myMessage : message )\n' +
//        'then\n' +
//        'System.out.println( myMessage );\n' +
//        'end';
//};
//
///**
// * Convert DRL to XML
// * @param      {DRL}   from
// * @return     {XML}   to
// */
//exports.convertDRLtoXML = function (from) {
//    return '<?xml version="1.0" encoding="UTF-8"?>' +
//        '<package name="com.sample" xmlns="http://drools.org/drools-5.2" xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" xs:schemaLocation="http://drools.org/drools-5.2 drools.org/drools-5.2.xsd">' +
//        '<import name="com.sample.DroolsTest.Message" />' +
//        '<rule name="Hello World">' +
//        '<lhs><pattern identifier="m" object-type="Message" >' +
//        '<expr>' +
//        'status == Message.HELLO' +
//        '</expr>' +
//        '<expr>' +
//        'myMessage : message' +
//        '</expr>' +
//        '</pattern>' +
//        '</lhs><rhs>System.out.println( myMessage );' +
//        'm.setMessage( "Goodbye cruel world" );' +
//        'm.setStatus( Message.GOODBYE );' +
//        'update( m );' +
//        '</rhs>' +
//        '</rule><rule name="GoodBye">' +
//        '<lhs><pattern object-type="Message" >' +
//        '<expr>' +
//        'status == Message.GOODBYE' +
//        '</expr>' +
//        '<expr>' +
//        'myMessage : message' +
//        '</expr>' +
//        '</pattern>' +
//        '</lhs><rhs>System.out.println( myMessage );' +
//        '</rhs>' +
//        '</rule>' +
//        '</package>';
//};
//
///**
// * Convert DRL to JSON
// * @param      {DRL}   from
// * @return     {JSON}   to
// */
//exports.convertDRLtoJSON = function (from) {
//    return [{
//        "id": "f41ae407.7dcf88",
//        "type": "inject",
//        "name": "AAAAAAA",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 171,
//        "y": 73,
//        "z": "7451ae03.b8f48",
//        "wires": [["fc79caa1.b4349"]]
//    }, {
//        "id": "fc79caa1.b4349",
//        "type": "function",
//        "name": "",
//        "func": "TESTE\nreturn msg;",
//        "outputs": 1,
//        "noerr": 0,
//        "x": 354,
//        "y": 118,
//        "z": "7451ae03.b8f48",
//        "wires": [["5c3ab542.ebbf24"]]
//    }, {
//        "id": "5c3ab542.ebbf24",
//        "type": "debug",
//        "name": "XXXXXXX",
//        "active": true,
//        "console": "false",
//        "complete": "payload",
//        "x": 575,
//        "y": 196,
//        "z": "7451ae03.b8f48",
//        "wires": []
//    }, {
//        "id": "aa6a532f.edd7b",
//        "type": "inject",
//        "name": "CCCCCC",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 163,
//        "y": 235,
//        "z": "7451ae03.b8f48",
//        "wires": [["1b6e20b0.e270e7"]]
//    }, {
//        "id": "1b6e20b0.e270e7",
//        "type": "function",
//        "name": "",
//        "func": "TESTE\nreturn msg;",
//        "outputs": 1,
//        "noerr": 0,
//        "x": 363,
//        "y": 280,
//        "z": "7451ae03.b8f48",
//        "wires": [["5c3ab542.ebbf24"]]
//    }, {
//        "id": "8946af04.002f08",
//        "type": "inject",
//        "name": "BBBBBBB",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 168,
//        "y": 142,
//        "z": "7451ae03.b8f48",
//        "wires": [["fc79caa1.b4349"]]
//    }, {
//        "id": "dafe7ad3.5ce928",
//        "type": "inject",
//        "name": "DDDDDD",
//        "topic": "",
//        "payload": "",
//        "payloadType": "date",
//        "repeat": "",
//        "crontab": "",
//        "once": false,
//        "x": 167,
//        "y": 326,
//        "z": "7451ae03.b8f48",
//        "wires": [["1b6e20b0.e270e7"]]
//    }];
//};