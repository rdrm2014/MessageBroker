/**
 * Created by ricardomendes on 06/10/15.
 */
var services = require('../services/services.js');

/**
 * GET home page
 *
 * @return     {object} render home page
 */
exports.index = function (req, res) {
    res.render('index');
};

/**
 * GET about page.
 * @return     {object} about page
 */
exports.about = function (req, res) {
    res.render('about');
};

/**
 * API
 */
exports.api = {
    /**
     * Convert NodeRed to XML
     * @param      {Object}   dataJSON
     * @return     {object} converted data XML
     */
    convertNodeRedtoXML: function (req, res){
        var json = JSON.parse(req.query['json']);
        res.json(services.convertNodeRedtoXML(json));
    },

    /**
     * Convert NodeRed to DRL
     * @param      {Object}   dataJSON
     * @return     {object} converted data DRL
     */
    convertNodeRedtoDRL: function (req, res){
        var json = JSON.parse(req.query['json']);
        res.json(services.convertNodeRedtoDRL(json));
    }
};