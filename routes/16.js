var express = require('express');
const {
    db
} = require('../db');
const {
    all_plz
} = require('../plz_schweiz');
const {
    text_16
} = require('../translations');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        date_time: '16. Mai 2022 um 13.30 - 17.00 in Einsiedeln',
        pre: "16"
    });
});

router.get('/form', function (req, res, next) {
    var lang_array = ["en", "uk", "de"];
    var lang = req.query.lang;
    if (!lang_array.includes(lang)) return res.redirect("/");
    return res.render("form", {
        text: text_16[0][lang],
        pre: "/16",
        link
    });
});

router.post('/reg', function (req, res, next) {
    try {


        var success = false
        all_plz.forEach(element => {
            if (req.body.house == element.plz + " - " + element.ort + " - " + element.kanton) success = true;
        });
        if (success !== true) return res.json({
            success: false,
            error: "addr"
        })
        let timestamp = new Date().toLocaleString("de-CH", {
            timeZone: "Europe/Zurich"
        });
        if (Number(req.body.people) > 20) return res.json({
            success: false,
            error: "pers"
        })
        db.query("INSERT INTO einladung_16 (Nachname, Vorname, Personenanzahl, E_Mail_Adresse, Wohnort, Angemeldet_am) VALUES (?,?,?,?,?,?)", [req.body.last_name, req.body.first_name, req.body.people, req.body.email, req.body.house, timestamp], function (error, results, fields) {
            if (error) console.log(error)
            if (error) return res.json({
                success: false,
                error: "error"
            })
            if (!error) return res.json({
                success: true
            })
        })
    } catch (error) {
        if (error) console.log(error)
        if (error) return res.json({
            success: false,
            error: "error"
        })
    }
})

module.exports = router;