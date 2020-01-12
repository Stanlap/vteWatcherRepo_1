let Datastore = require('nedb'),
    db = new Datastore({
        filename: './dataUser',
        autoload: true
    });

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports.addUser = (email, password, response) => {
    db.findOne({
        email: email
    }, {
        password: bcrypt.hashSync(password, salt)
    }, function (err, doc) {
        if (!doc) {
            let doc_1 = {
                email: email,
                password: bcrypt.hashSync(password, salt)
            };
            db.insert(doc_1, function (err, newDoc) {
                response.send(`User has created - ${newDoc.email}`);
            });
        } else {
            console.log('User exists!');
            response.send(`User exists - ID ${doc._id}`);
        };
    });
}