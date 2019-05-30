const db = require("../models");

module.exports = {
    create: function(req, res) {
        console.log("user data", req.userData);
    //     db.Schema.User.create(req.body)
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },

}