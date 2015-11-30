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
     * Converte um diagrama de Node-Red para XML
     * @param      {Object} dataJSON
     * @return     {object} dados convertidos para XML
     */
    convertNodeRedtoXML: function (req, res){
        var json = JSON.parse(req.query['json']);
        res.json(services.convertNodeRedtoXML(json));
    },

    /**
     * Converte um diagrama de Node-Red para DRL
     * Convert NodeRed to DRL
     * @param      {Object} dataJSON
     * @return     {object} dados convertidos para DRL
     */
    convertNodeRedtoDRL: function (req, res){
        var json = JSON.parse(req.query['json']);
        res.json(services.convertNodeRedtoDRL(json));
    }
};