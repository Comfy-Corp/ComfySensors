var express    = require('express');
var app        = express();            
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'comfy',
  database : 'data'
});
connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();   

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/watt', function(req, res) {
 	connection.query('SELECT * FROM watt', function(err, rows, fields) {
                if (!err)
                        res.json({message: rows});
                else
                        res.json({message: 'Error while performing Query.'});
        });
});

router.get('/watt/getday', function(req, res) {
	connection.query('SELECT * FROM watt WHERE date >= now() - INTERVAL 1 DAY', function(err, rows, fields) {
  		if (!err)
    			res.json({message: rows});
  		else
    			res.json({message: 'Error while performing Query.'});
	});
});

router.get('/watt/getweek', function(req, res) {
 	connection.query('SELECT * FROM watt WHERE date >= now() - INTERVAL 7 DAY', function(err, rows, fields) {
                if (!err)
                        res.json({message: rows});
                else
			res.json({message: 'Error while performing Query.'});

        });
});

router.get('/watt/getmaand', function(req, res) {
	connection.query('SELECT * FROM watt WHERE date >= now() - INTERVAL 1 MONTH', function(err, rows, fields) {
                if (!err)
                        res.json({message: rows});
                else
			res.json({message: 'Error while performing Query.'});

        });
});

app.use('/api', router);

app.use(express.static(__dirname + '/www'));

//start
app.listen(port);
console.log('Magic happens on port ' + port);
