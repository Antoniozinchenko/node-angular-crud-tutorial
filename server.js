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

// route parameters
app.get('/allMessages', function (req, res) {
    res.render('partials/message-table');
});
app.get('/mainTemplate', function (req, res) {
    res.render('partials/index-content');
});
app.get('/editTemplate', function (req, res) {
    res.render('partials/edit-page');
});
app.get('/singleView', function (req, res) {
    res.render('partials/show-single');
});


//add new message request
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

// get all messages request
app.get('/getAllMessages', function (req, res) {
    //var client = connection;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.end();
            return;
        }
        connection.query('select * from messagetable', function (err, resp) {
            if (err) {
                connection.release();
                console.log(err);
                res.json([]).end();
                return
            }
            connection.release();
            res.json(resp).end();
        });
    });
});


//remove message from database request
app.post('/removeMessage', jsonParser, function (req, res) {
    var objToSave = req.body;
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('delete from messagetable where id=?', [objToSave.id], function (err) {
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

// request for getting one message by ID
app.get('/getSingleMessage/:id', function (req, res) {
    var id = req.params.id;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.end();
            return;
        }
        connection.query('select * from messagetable  where id=?', [id], function (err, resp) {
            if (err) {
                connection.release();
                console.log(err);
                res.json([]).end();
                return
            }
            connection.release();
            res.json(resp).end();
        });
    });
});

// request for updating edited message
app.post('/updateMessage', jsonParser, function (req, res) {
    var objToSave = req.body;
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        var queryString = "update messagetable set username='" + objToSave.username + "', message='"+ objToSave.message +"' where id=" + objToSave.id;
        client.query(queryString, function (err) {
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