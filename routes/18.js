var express = require('express');
const { text_18 } = require('../translations');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { date_time: '18. Mai 2022 um 13.30 - 17.00 in Schwyz', pre: "18" });
});

router.get('/form', function(req, res, next) {
  var lang_array = ["en", "uk", "de"];
  var lang = req.query.lang;
  if (!lang_array.includes(lang)) return res.redirect("/18");
  return res.render("form", {
    text: text_18[0][lang],
    pre: "/18"
  });

});

module.exports = router;
