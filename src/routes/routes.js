/**
 * Created by ricardomendes on 06/10/15.
 */
var config = require('../config/myConfig.js');
var services = require('../services/services.js');

/**
 * GET home page
 *
 * *Examples:*
 *
 *     var things = [{
 *                "stuff": {
 *                  "evenMoreStuff": {
 *                    "evenMoreStuff": null
 *                  }
 *                }
 *              }];
 *
 *      // returns ["stuff"]
 *      simplify(things);
 *     utils.escape('<script></script>')
 *     // => '&lt;script&gt;&lt;/script&gt;'
 *
 *
 * @param      {object}   req
 * @param      {object}   res
 * @return     {object} render home page
 */
exports.index = function (req, res) {
    res.render('index', {config: config.myconfig});
};

/**
 * GET about page.
 * @param      {object}   req The number for squaring
 * @param      {object}   res
 * @return     {object} about page
 */
exports.about = function (req, res) {
    res.render('about', {config: config.myconfig});
};

/**
 * API
 */
exports.api = {
    /**
     * Convert
     * Permite converter ficheiros
     * Tipos de ficheiros disponíveis: ["xml", "json", "drl"];
     *
     *
     * @param      {object}   req [from, typeFrom, typeTo]
     * @param      {object}   res
     * @return     {object} render result
     */
    convert: function (req, res) {
        console.log(req.query);
        var paramObj = {
            from: req.query['from'],
            typeFrom: req.query['typeFrom'],
            typeTo: req.query['typeTo']
            //typeFrom: req.query['typeFrom'] != "" ? req.query('typeFrom') : "json",
            //typeTo: req.query['typeTo'] != "" ? req.query('typeTo') : "xml"
        };

        var result;

        var listTypes = ["xml", "json", "drl"];

        /**
         * Simplifies things.
         *
         * *Examples:*
         *
         *      var things = [{
         *        "stuff": {
         *          "evenMoreStuff": {
         *            "evenMoreStuff": null
         *          }
         *        }
         *      }];
         *
         *      // returns ["stuff"]
         *      simplify(things);
         *
         *
         * @param {object[]} - things
         * @see exports.simplify
         * @api public
         */
        if (listTypes.indexOf((paramObj.typeFrom).toLowerCase()) > -1 &&
            listTypes.indexOf(paramObj.typeTo.toLowerCase()) > -1 &&
            paramObj.typeFrom.toLowerCase() != paramObj.typeTo.toLowerCase()){

            if(paramObj.typeFrom.toLowerCase() =="xml"){
                if(paramObj.typeTo.toLowerCase() =="json"){
                    result = services.convertXMLtoJSON(paramObj.from, paramObj.to);
                } else if(paramObj.typeTo.toLowerCase() =="drl"){
                    result = services.convertXMLtoDRL(paramObj.from, paramObj.to);
                } else {
                    console.log("Tipo2 Desconhecido");
                }
            } else if(paramObj.typeFrom.toLowerCase() =="json"){
                if(paramObj.typeTo.toLowerCase() =="xml"){
                    result = services.convertJSONtoXML(paramObj.from, paramObj.to);
                } else if(paramObj.typeTo.toLowerCase() =="drl"){
                    result = services.convertJSONtoDRL(paramObj.from, paramObj.to);
                } else {
                    console.log("Tipo2 Desconhecido");
                }
            } else if(paramObj.typeFrom.toLowerCase() =="drl"){
                if(paramObj.typeTo.toLowerCase() =="xml"){
                    result = services.convertDRLtoXML(paramObj.from, paramObj.to);
                } else if(paramObj.typeTo.toLowerCase() =="json"){
                    result = services.convertDRLtoJSON(paramObj.from, paramObj.to);
                } else {
                    console.log("Tipo2 Desconhecido");
                }
            } else {
                console.log("Tipo Desconhecido");
            }
        } else{
            console.log("ERROR");
        }
        res.send(result);
    }
};