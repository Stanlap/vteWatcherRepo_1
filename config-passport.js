const passport = require('passport');
const LocalStrategy = require('passport-local');
let Datastore = require('nedb'),
    db = new Datastore({
        filename: './dataUser',
        autoload: true
    });
const bcrypt = require('bcryptjs');
const foundedUser = {};

passport.serializeUser((user, done) => {
    console.log(`Сериализация ${user}`);
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    console.log(`Десериализация ${id}`);
    const user = (foundedUser._id === id) ? foundedUser : false;
    done(null, user);
});
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    let p_1 = new Promise((resolve, reject) => {
        db.findOne({
            email: email
        }, (err, doc) => {
            resolve(doc);
        })
    })
    p_1.then(doc => {
        if (doc) {
            bcrypt.compare(password, doc.password, function (err, res) {
                if (res) {
                    foundedUser._id = doc._id;
                    foundedUser.email = doc.email;
                    console.log('Local strategy', doc);
                    return done(null, doc);
                } else {
                    return done(null, false);
                };
            })
        } else {
            return done(null, false);
        }
    });
}));