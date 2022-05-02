var express = require('express');
var router = express.Router();
const {
    text_18
} = require('../translations');

router.get('/', function (req, res, next) {
    res.redirect('https://www.sz.ch/afm')
});

router.get('/success', function (req, res, next) {
    var lang_array = ["en", "uk", "de"];
    var lang = req.query.lang;
    if (!lang_array.includes(lang)) return res.redirect("/18");
    return res.render("success", {
        text: text_18[0][lang]
    });
});

module.exports = router;