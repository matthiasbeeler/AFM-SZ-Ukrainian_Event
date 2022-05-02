var express = require('express');
var router = express.Router();
const {
    text_18,
    text_16
} = require('../translations');
const excel = require('exceljs');
const { db } = require('../db');


function generate(){
    let workbook = new excel.Workbook(); //creating workbook

    db.query(`SELECT * FROM einladung_18`, function (error, results, fields) {
        const jsonCustomers = JSON.parse(JSON.stringify(results));
        /**
            [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
            { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
            { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
            { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
            { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
        */

        let worksheet = workbook.addWorksheet('18.05.2022'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [{
                header: 'Id',
                key: 'id',
                width: 10
            },
            {
                header: 'Vorname',
                key: 'Vorname',
                width: 30
            },
            {
                header: 'Nachname',
                key: 'Nachname',
                width: 30
            },
            {
                header: 'Personenanzahl',
                key: 'Personenanzahl',
                width: 10
            },
            {
                header: 'E-Mail-Adresse',
                key: 'E_Mail_Adresse',
                width: 30
            },
            {
                header: 'Wohnort',
                key: 'Wohnort',
                width: 30
            },
            {
                header: 'Angemeldet am:',
                key: 'Angemeldet_am',
                width: 30
            },
        ];

        // Add Array Rows
        worksheet.addRows(jsonCustomers);

        // Write to File
        
    })
        
    db.query(`SELECT * FROM einladung_16`, function (error, results, fields) {
        const jsonCustomers = JSON.parse(JSON.stringify(results));
        /**
            [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
            { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
            { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
            { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
            { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
        */

        let worksheet = workbook.addWorksheet('16.05.2022'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [{
                header: 'Id',
                key: 'id',
                width: 10
            },
            {
                header: 'Vorname',
                key: 'Vorname',
                width: 30
            },
            {
                header: 'Nachname',
                key: 'Nachname',
                width: 30
            },
            {
                header: 'Personenanzahl',
                key: 'Personenanzahl',
                width: 10
            },
            {
                header: 'E-Mail-Adresse',
                key: 'E_Mail_Adresse',
                width: 30
            },
            {
                header: 'Postleitzahl',
                key: 'plz',
                width: 30
            },
            {
                header: 'Ort',
                key: 'ort',
                width: 30
            },
            {
                header: 'Angemeldet am:',
                key: 'Angemeldet_am',
                width: 30
            },
        ];

        // Add Array Rows
        worksheet.addRows(jsonCustomers);

        // Write to File
        workbook.xlsx.writeFile("data.xlsx")
            .then(function () {
                console.log("file saved!");
            });
    })
}


router.get('/', function (req, res, next) {
    if (req.query.pass !== process.env.data_pass) return res.redirect('https://www.sz.ch/afm')
    res.render('data', {
        passwd: req.query.pass
    })
    generate()


});
router.post('/download', function (req, res, next) {
    if (req.query.pass !== process.env.data_pass) return res.redirect('https://www.sz.ch/afm')
    res.download("./data.xlsx", "data.xlsx");


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

module.exports = router;