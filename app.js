const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport');
const userDB = require('./neDB');
const countRF = require('./public/vte_brain');
const app = express();
const port = 8000;



app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
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

app.get('/', (req, res) => {
    res.render('main', {
        title: 'Main page'
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Entry form',
        passMessage: 'Пароль допускает строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 знаков.'
    });
});
app.get('/registration', (req, res) => {
    res.render('regist', {
        title: 'Registration form',
        passMessage: 'Пароль допускает строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 знаков.'
    });
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', {
                title: 'Login',
                passMessage: 'Пользователь не идентифицирован.'
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.render('mainAuth', {
                title: 'Main Page Authenticated'
            });
        });
    })(req, res, next);
});
app.post('/registration', function (req, res) {
    userDB.addUser(req.body.email, req.body.password[0], res);
});

// app.post('/count', function (req, res) {
//     let xAr_3 = countRF.countKindsRF(req.body.rfArr, req.body.objPatient);
//     let json = JSON.stringify(xAr_3);
//     return res.send(json);
// });

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

app.get('/mainAuth', auth, (req, res) => {
    res.render('mainAuth', {
        title: 'Main Page Authenticated',
        message: ''
    });
    });
app.get('/profile', auth, (req, res) => {
    res.render('profile', {
        title: 'Profile',
        message: 'Profile Page'
    });
});
app.get('/profile_user', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_profile_user', {
        title: 'User Profile Page',
    });
});
app.get('/progList', auth, (req, res) => {
    res.render('progList', {
        title: 'Programs List'
    });
});
app.get('/programs', auth, (req, res) => {
    res.render('programs', {
        title: 'Programs Page',
        message: 'Programs Page'
    });
});

app.get('/vte_patient_profile', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_patient_profile', {
        title: 'vte Watcher Patient Profile Page',
        message: 'vte Watcher Patient Profile Page'
    });
});

app.get('/vte_oper_profile', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_oper_profile', {
        title: 'Surgery Profile'
    });
});
app.get('/vte_obst_profile', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_obst_profile', {
        title: 'Obst Gyn Profile'
    });
});

app.get('/vte_patient_list_rf', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_patient_list_rf', {
        title: 'vte Watcher Patient Risk Factors'       
    });
});

app.get('/vte_results_rf', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_results_rf', {
        title: 'vte Watcher Patient Has Risk Factors',
        message: 'vte Watcher Patient Has Risk Factors'
    });
});

app.get('/vte_1', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_watch_1.ejs', {
        title: 'vte Watcher Start Page',
        message: 'vte Watcher Start Page'
    });
});

app.get('/vte_2', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_watch_2.ejs', {
        title: 'vte Watcher Second Page',
        message: 'vte Watcher Second Page'
    });
});
app.get('/vte_concl', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_concl.ejs', {
        title: 'vte Conclusion about risk of VTE'
    });
});
app.get('/vte_drug', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_drug.ejs', {
        title: 'vte Define Drug',
        message: 'vte Define Drug'
    });
});

app.get('/vte_assignment_sheet', auth, (req, res) => {
    res.render('vte_watch_ejs/vte_assignment_sheet.ejs', {
        title: 'vte Assignment sheet',
        message: 'vte Assignment sheet'
    });
});

app.post('/count', auth, (req, res) => {
    console.log(req.body.rfArr);
    let xAr = countRF.countKindsRF(req.body.rfArr, req.body.objPatientForCounter);
    let jxAr = JSON.stringify(xAr);
    return res.send(jxAr);
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));