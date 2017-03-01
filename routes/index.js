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

    var originalCurrency = req.query.fromCurrency;
    var originalToDollarRate = exchangeRates[originalCurrency];
    var dollars = originalCurrencyAmount / originalToDollarRate;

    var desiredCurrency = req.query.to_currency;
    var dollarToDesiredRate = exchangeRates[desiredCurrency];
    var result = dollars * dollarToDesiredRate;

    res.render('results', { dollars : originalCurrencyAmount.toFixed(2),
        result: result.toFixed(2), currency: desiredCurrency, from : originalCurrency})
});

module.exports = router;