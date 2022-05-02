var express = require('express');
const { db } = require('../db');
const { all_plz } = require('../plz_schweiz');
const { send } = require('../send_mail');
const { text_18 } = require('../translations');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { date_time: '18. Mai 2022 um 13.30 - 17.00 in Schwyz', pre: "18" });
});

router.get('/form', function(req, res, next) {
  var lang_array = ["en", "uk", "de"];
  var lang = req.query.lang;
  if (!lang_array.includes(lang)) return res.redirect("/18");
  return res.render("form", {
    text: text_18[0][lang],
    pre: "/18",
    pre_n: "18",
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
      var addresse_split = req.body.house.split('-')
        db.query("INSERT INTO einladung_18 (Nachname, Vorname, Personenanzahl, E_Mail_Adresse, plz, ort, Angemeldet_am) VALUES (?,?,?,?,?,?,?)", [req.body.last_name, req.body.first_name, req.body.people, req.body.email, addresse_split[0], addresse_split[1], timestamp], function (error, results, fields) {
            if (error) console.log(error)
          if (error) return res.json({
              success: false,
              error: "error"
          })
          send(req.body.email, req.body.lang, 18, req.body.last_name, results.insertId)
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
