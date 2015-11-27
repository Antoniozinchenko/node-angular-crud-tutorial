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
    password: "root",
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

app.get('/showMessagePage', function (req, res) {
    res.render('partials/showMessage');
});

app.get('/editMessagePage', function (req, res) {
    res.render('partials/edit');
});

app.get('/singlePage', function (req, res) {
    res.render('partials/singlePage');
});

app.get('/pageNotFound', function (req, res) {
    res.render('partials/404');
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
                return client.release();
            }
            client.release();
            return res.end();
        });
    });
});

app.get('/getAllMessages', jsonParser, function (req, res) {
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('select * from messagetable', function (err, resonse) {
            if (err) {
                console.log(err);
                return client.release();
            }
            client.release();

            res.json(resonse).end();
        });
    });
});

app.post('/removeMessage', jsonParser, function (req, res) {
    var userID = req.body.id;
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('delete from messagetable where id=?', [userID], function (err) {
            if (err) {
                console.log(err);
                return client.release();
            }
            client.release();
            return res.end();
        });
    });
});

app.get('/getMessage/:id', function (req, res) {
    var userId = req.params.id;
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('select * from messagetable where id=?', userId, function (err, resonse) {
            if (err) {
                console.log(err);
                return client.release();
            }
            client.release();

            res.json(resonse).end();
        });
    });
});

app.post('/updateMessage', jsonParser, function (req, res) {

    var userId = req.body.id,
        userName = req.body.username,
        message = req.body.message;

    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('update messagetable set username=?, message=? where id=? ', [userName, message, userId], function (err) {
            if (err) {
                console.log(err);
                return client.release();
            }
            client.release();
            return res.end();
        });
    });
});

app.get('/singlePage/:id', function (req, res) {
    var userId = req.params.id;

    console.log('single start: '+userId);
    pool.getConnection(function (err, client) {
        if (err) {
            console.log(err);
            client.release();
            res.end();
        }
        client.query('select * from messagetable where id=?', userId, function (err, resonse) {
            if (err) {
                console.log(err);
                return client.release();
            }
            client.release();

            res.json(resonse).end();
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



app.get('*', function (req, res) {
    res.render('index');
});
http.createServer(app).listen(3000);
console.log('server is running on  3000');