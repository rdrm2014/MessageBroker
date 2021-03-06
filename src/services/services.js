/**
 * Created by ricardomendes on 06/10/15.
 */
exports.convert = function () {
    return {name: 'ruleName', rule: 'xmlString'};
};

/**
 * Converte um diagrama de Node-Red em JSON para XML
 * @param      {JSON}   json
 * @return     {XML}   xml
 */
exports.convertNodeRedtoXML = function (json) {
    var ruleName = json.name;
    var DirectedGraph = require('graph-json').DG;

    var builder = require('xmlbuilder');
    try {
        var nodered = json.data;

        var graph = new DirectedGraph();

        for (var i in nodered) {
            var node = nodered[i];

            if (node.func) {
                graph.addNode(node.id, {name: node.name, type: node.type, func: node.func});
            } else {
                graph.addNode(node.id, {name: node.name, type: node.type});
            }
            if (node.wires) {
                if (node.wires[0]) {
                    for (var a in node.wires[0]) {

                        console.log(node.wires[0][a]);
                        graph.addEdge(node.id + '->' + node.wires[0][a], node.id, node.wires[0][a]);
                    }
                }
            }
        }

        var sortedGraph = graph.tSort();

        var node1 = graph.getNode(sortedGraph[0]);
        var node2 = graph.getNode(sortedGraph[1]);
        var node3 = graph.getNode(sortedGraph[2]);

        console.log(JSON.stringify(node3));

        //var name = "Hello World";
        var expr1 = node1.func;//"status == Message.HELLO";
        var expr2 = node3.func;//"myMessage : message";
        var rhs = node2.func;//'System.out.println( myMessage ); m.setMessage( "Goodbye cruel world" ); m.setStatus( Message.GOODBYE ); update( m );';

        var xml = builder.create('package').att('name', "com.sample").att('xmlns', "http://drools.org/drools-5.2").att('xmlns:xs', "http://www.w3.org/2001/XMLSchema-instance").att('xs:schemaLocation', "http://drools.org/drools-5.2 drools.org/drools-5.2.xsd");

        xml.ele('import', {'name': "com.es.rulesengine.model.Notification"});
        xml.ele('import', {'name': "com.es.rulesengine.model.Temperature"});
        xml.ele('import', {'name': "com.es.rulesengine.model.PIRSensor"});

        var ruleElem = xml.ele('rule', {'name': ruleName});
        var lhsElem = ruleElem.ele('lhs');
        var patternElem = lhsElem.ele('pattern', {'object-type': "Message"});

        patternElem.ele('expr', {}, expr1);
        patternElem.ele('expr', {}, expr2);

        ruleElem.ele('rhs', {}, rhs);

        var xmlString = xml.end({pretty: true});

        return {name: ruleName, rule: xmlString};
    } catch (e) {
        return {error: 'ERROR'};
    }
};

/**
 * Converte um diagrama de Node-Red em JSON para DRL
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
        if (node.func) {
            graph.addNode(node.id, {name: node.name, type: node.type, func: node.func});
        } else {
            graph.addNode(node.id, {name: node.name, type: node.type});
        }
        if (node.wires) {
            if (node.wires[0]) {
                for (var a in node.wires[0]) {

                    console.log(node.wires[0][a]);
                    graph.addEdge(node.id + '->' + node.wires[0][a], node.id, node.wires[0][a]);
                }
            }
        }
    }

    var sortedGraph = graph.tSort();

    var node1 = graph.getNode(sortedGraph[0]);
    var node2 = graph.getNode(sortedGraph[1]);
    var node3 = graph.getNode(sortedGraph[2]);

    //var name = "Hello World";
    //var expr1 = node1.data.func;//"status == Message.HELLO";
    var expr2 = node3.data.func;//"myMessage : message";
    var rhs = node2.data.func;//'System.out.println( myMessage ); m.setMessage( "Goodbye cruel world" ); m.setStatus( Message.GOODBYE ); update( m );';

    var resultDRL = "import com.es.rulesengine.model.Notification; " +
        "import com.es.rulesengine.model.Temperature; " +
        "import com.es.rulesengine.model.PIRSensor; " +
        "rule \"" + ruleName + "\" " +
        "when " +
        rhs + " " +
        "then " +
        expr2 + " " +
        "end";

    return {'ruleName': ruleName, 'rule': resultDRL};
};