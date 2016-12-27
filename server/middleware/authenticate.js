const {
    User
} = require('./../models/user');


var authenticate = function(req, res, next) {
    var token = req.header('x-auth');

    console.log("Token inside authenticate is " , token);
    User.findByToken(token).then((user) => {
        if (!user) {
          console.log("No user found inside authenticate");
            return Promise.reject();
        }

        //res.send(user);
        req.user = user;
        req.token = token;

        next();

    }).catch((e) => {
        res.status(401).send();
    });
};


module.exports = {authenticate};
