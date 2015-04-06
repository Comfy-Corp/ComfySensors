var jwt = require('jwt-simple');
var auth = {

	login: function(req, res) {

        console.log(JSON.stringify(req.headers.authorization));
        var authorization = req.headers.authorization || '';
        if(authorization != '') {
            var tmp = authorization.split(' ');
            var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
            var plain_auth = buf.toString(); 
            var creds = plain_auth.split(':');      // split on a ':'
            var username = creds[0];
            var password = creds[1];
        }
        else {
           res.status(401);
           res.json( {
            "status": 401,
            "message":"Empty login :(, bye"
        }); 
           return;
       }

       // For now
       var loginName = req.app.get('username');
       var loginPass = req.app.get('password');
	   // Check for valid user/passwd combo
    if ((username == loginName) && (password == loginPass)) {
        var now = new Date();
        var expires = now.setHours(now.getDay() + 10);
        var token = jwt.encode({
            iss: username,
            exp: expires
        }, req.app.get('secretkey'));
        res.cookie('webtoken', token);
        res.status = 200;
        res.json({
            token: token,
            expires: expires,
            user: username
        });
    }
    else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Unknown USER, bye"
        });
    }
} 
}

module.exports = auth;
