const fs = require('fs');
var express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    fs.readFile('./landingPage.html', function (err, html) {
        if (err) {
            console.log(err.message);
        }       
        res.status(200).write(html);
        res.end();
    });
});


module.exports = router;
