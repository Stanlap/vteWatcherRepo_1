const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport');
const userDB = require('./neDB');
const countRF = require('./public/vte_brain');
const app = express();
const port = 8000;
// const ejs = require('ejs');



app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
// app.use(express.static(__dirname + "/public"));
app.use(
    session({
        secret: 'obobNMN23h',
        store: new fileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false
    })
)
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.get('/', (req, res) => {
    res.render('main',{title: "Main page", message: "Main Page"});
});
app.get('/login', (req, res) => {
    res.render('login',{title: "Entry form", message: "Entry Page"});
});
app.get('/registration', (req, res) => {
    res.render('regist',{title: "Registration form", message: "Registration Page"});
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('Укажите правильный email или пароль!')
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.render('programs',{title: "Programs Page", message: "Programs Page"});
        });
    })(req, res, next);
});
app.post('/registration', function (req, res) {
    userDB.addUser(req.body.email, req.body.password, res);
});
app.post('/count', function (req, res) {
    let xAr_3 = countRF.countKindsRF(req.body.rfArr, req.body.objPatient);
    let json = JSON.stringify(xAr_3);
    return res.send(json);
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
    foundedUser = {};
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/')
    }
}

app.get('/profile', auth, (req, res) => {
    res.render('profile',{title: "Profile", message: "Profile Page"});
});
app.get('/programs', auth, (req, res) => {
    res.render('programs',{title: "Programs Page", message: "Programs Page"});
});

app.get('/vte_patient_profile', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_patient_profile',{title: "vte Watcher Patient Profile Page", message: "vte Watcher Patient Profile Page"});
});

app.get('/vte_patient_list_rf', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_patient_list_rf',{title: "vte Watcher Patient Risk Factors", message: "vte Watcher Patient Risk Factors"});
});

app.get('/vte_results_rf', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_results_rf',{title: "vte Watcher Patient Has Risk Factors", message: "vte Watcher Patient Has Risk Factors"});
});

app.get('/vte_1', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_watch_1.ejs',{title: "vte Watcher Start Page", message: "vte Watcher Start Page"});
});

app.get('/vte_2', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_watch_2.ejs',{title: "vte Watcher Second Page", message: "vte Watcher Second Page"});
});


app.listen(port, () => console.log(`Server is listening on port ${port}!`));