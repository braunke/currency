var request = require('request');
var moment = require('moment');

//main call to website
var baseURL = 'http://www.apilayer.net/api/live';

function currencylayerRequest(from, to, callback) {
    var queryParam = {
        access_key: process.env.CL_API_KEY,
        //just gets back needed currencies
        currencies : from + ',' + to
    };

    //Use request module to request data from currencylayer service.
    //Must handle result in callback.
    request( {uri :baseURL, qs: queryParam} , function(error, response, body){

        if (!error && response.statusCode == 200){
            var responseBody = JSON.parse(body); //Convert JSON text to a JavaScript object
            var quotes = responseBody.quotes;
            callback({
                //uses desired currencies to only get the needed ones
                originalToDollarRate: quotes['USD' + from],
                dollarToDesiredRate: quotes['USD' + to]
            });
        }

        else {
            //Log error info to console and return error with message.
            console.log("Error in JSON request: " + error);
            console.log(response);
            console.log(body);
            callback(null, Error("Error fetching data"));
        }
    });
}

module.exports = currencylayerRequest;