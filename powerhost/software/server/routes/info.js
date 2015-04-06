var info = {

	get1h: function(req, res) {
		var query = 'SELECT * FROM watt WHERE date >= now() - INTERVAL 1 HOUR';
		handleRequest(req, res, query);
	},

	get24h: function(req, res) {
		var query = 'SELECT * FROM watt WHERE date >= now() - INTERVAL 1 DAY';
		handleRequest(req, res, query);
	},


	get7d: function(req, res) {
		var query = 'SELECT * FROM watt WHERE date >= now() - INTERVAL 7 DAY';
		handleRequest(req, res, query);

	},

	get1m: function(req, res) {
		var query = 'SELECT * FROM watt WHERE date >= now() - INTERVAL 1 MONTH';
		handleRequest(req, res, query);

	},

	getlast: function(req, res) {
		var query = 'SELECT * FROM watt ORDER BY id DESC LIMIT 1';
		handleRequest(req, res, query);

	},

	getTimeSince: function(req, res) {
		var query = 'SELECT * FROM watt ORDER BY id DESC LIMIT 1';
		var db = req.app.get('dbConnection');
        	db.query(query, function (err, rows, fields) {
                	if(err) throw err;
                	var last = rows[0]['date'];
			last = last - 7200;
			console.log(last);
			var time = Date.now()-last;
			console.log(Date.now());
               		console.log(Math.round(time/1000));
			res.json(Math.round(time/1000));
	        });

	},

	// dummy post
	createInfo: function(req, res) {
		var message = req.body;
		dummy.push(message);
		res.json(dummy);
	},
};

module.exports = info;

//
// Helper functions
//
function handleRequest(req, res, query)
{
	var db = req.app.get('dbConnection');
	db.query(query, function (err, rows, fields) {
		if(err) throw err;
		var results = [];
		rows.forEach(function(item){
			results.push({
				watt : item.watt,
				date: item.date
			});
		});
		res.json(results);
	});	
}

//
// Dummy
//
var dummy = [{
	message : 'Warning, NodeJS is cool',
	id		: 1
}, {
	message : 'Visual Basic is boring',
	id		: 2
}];

// module.exports = info;
