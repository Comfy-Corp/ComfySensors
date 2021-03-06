var jwt = require('jwt-simple');

module.exports = function (req, res, next) {

    var token = (req.header('X-Access-Token')) || '';
    
    if (token) {
        try {
            var decoded = jwt.decode(token, req.app.get('secretkey'));

            // Check if token is from known user
            // for now ..
            var userName = req.app.get('username')
            
            if( decoded.iss == userName) {
                req.app.set("userid", decoded.iss);
                console.log("Userid: " + req.app.get('userid'));
                return next();
            }
            else {
                res.status(401);
                res.json({
                    "status": 401, "message": "Unknown user"
                });
            }
        }
        catch (err) {
            console.log("Authorization failed: " + err);
        }
    }

    res.status(401);
    res.json({
        "status": 401, "message": "Add a login, bye"
    });
}
