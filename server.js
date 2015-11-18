var http = require('http');
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var config = {
    connectionLimit: 20,
    host: "localhost",
    user: "root",
    password: "321",
    database: "crud",
    debug: false
};

var pool = mysql.createPool(config);

app.set('view engine', 'jade');
app.set('views', './view');
app.use(express.static(__dirname + '/public'));

app.get('/mainTemplate', function (req, res) {
    res.render('partials/index-content');
});




app.post('/saveMessage', jsonParser, function (req, res) {
    var objToSave = req.body;
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('insert into messagetable(username, message) values(?, ?)', [objToSave.username, objToSave.message], function (err) {
            if (err) {
                console.log(err);
                client.release();
                return;
            }
            client.release();
            res.end();
        });
    });
});



app.get('*', function (req, res) {
    res.render('index');
});
http.createServer(app).listen(3000);
console.log('server is running on  3000');