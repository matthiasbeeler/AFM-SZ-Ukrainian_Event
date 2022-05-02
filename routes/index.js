var express = require('express');
var router = express.Router();
const {
    text_18,
    text_16
} = require('../translations');
const jwt = require('jsonwebtoken');
const {
    db
} = require('../db');

router.get('/', function (req, res, next) {
    res.redirect('https://www.sz.ch/afm')
});

router.get('/success', function (req, res, next) {
    var lang_array = ["en", "uk", "de"];
    var lang = req.query.lang;
    if (!lang_array.includes(lang)) return res.redirect("/18");
    if (req.query.num == 16) {
        return res.render("success", {
            text: text_16[0][lang]
        });
    } else {
        return res.render("success", {
            text: text_18[0][lang]
        });
    }

});

router.get('/cancel', function (req, res, next) {
    var token = req.query.token;
    var data = jwt.verify(token, process.env.jwt_secret, (err, result) => {
        if (err) return res.redirect('https://www.sz.ch/afm')
    })
    var data = jwt.verify(token, process.env.jwt_secret)

    db.query(`SELECT * FROM einladung_${data.num} WHERE id = ?`, [data.id], function (error, results, fields) {
        if (data.num == 16) {
            return res.render("cancel", {
                text: text_16[0][data.lang],
                btn_val: `${token}`
            });
        } else {
            return res.render("cancel", {
                text: text_18[0][data.lang],
                btn_val: `${token}`
            });
        }
    })
})

router.post('/cancel', function (req, res, next) {
    try {
        
    var token = req.body.token;

    var data = jwt.verify(token, process.env.jwt_secret, (err, result) => {
        if (err) return res.json({
            success: false
        })
    })
    var data = jwt.verify(token, process.env.jwt_secret)

    db.query(`DELETE FROM einladung_${data.num} WHERE id = ? AND E_Mail_Adresse = ?`, [data.id, data.email], function (error, results, fields) {
        if (!error) return res.json({
            success: true
        })
        if (error) console.log(error)
        if (error) return res.json({
            success: false
        })
    })
    
} catch (error) {
    console.log(error)   

    if (error) return res.json({
        success: false
    })
}
})

module.exports = router;