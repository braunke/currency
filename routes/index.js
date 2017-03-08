var express = require('express');
var currencylayer = require('../helpers/currencylayer');
var router = express.Router();

/* Handle GET request for home page */
router.get('/', function(req, res){
    //res.send('Currency Site');
    res.render('index');
});

/* Handle currency form submit */
router.get('/convert', function(req, res){

    //gets the original currency
    var originalCurrency = req.query.fromCurrency;
    //gets the currency you are changing to
    var desiredCurrency = req.query.to_currency;
    currencylayer(originalCurrency, desiredCurrency, function (data, error) {
        if (error) {
            console.log(error);
        } else {
            var originalCurrencyAmount = parseFloat(req.query.dollar_amount);
            //changes to dollars
            var originalToDollarRate = data.originalToDollarRate;
            var dollars = originalCurrencyAmount / originalToDollarRate;
            var dollarToDesiredRate = data.dollarToDesiredRate;
            //does the conversion
            var result = dollars * dollarToDesiredRate;
        }
        //results, money about formatted to look better
        res.render('results', { dollars : originalCurrencyAmount.toFixed(2),
            result: result.toFixed(2), currency: desiredCurrency, from : originalCurrency})
    });
});


module.exports = router;