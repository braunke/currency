var express = require('express');
var router = express.Router();

var exchangeRates = { 'EUR' : 0.94, 'JPY' : 112.86, "USD" : 1.0 };

/* Handle GET request for home page */
router.get('/', function(req, res){
    //res.send('Currency Site');
    res.render('index');
});


/* Handle currency form submit */
router.get('/convert', function(req, res){
    var originalCurrencyAmount = parseFloat(req.query.dollar_amount);
    //gets the original currency
    var originalCurrency = req.query.fromCurrency;
    //changes to dollars
    var originalToDollarRate = exchangeRates[originalCurrency];
    var dollars = originalCurrencyAmount / originalToDollarRate;
    //gets the currency you are changing to
    var desiredCurrency = req.query.to_currency;
    var dollarToDesiredRate = exchangeRates[desiredCurrency];
    //does the conversion
    var result = dollars * dollarToDesiredRate;
    //results, money about formatted to look better
    res.render('results', { dollars : originalCurrencyAmount.toFixed(2),
        result: result.toFixed(2), currency: desiredCurrency, from : originalCurrency})
});

module.exports = router;