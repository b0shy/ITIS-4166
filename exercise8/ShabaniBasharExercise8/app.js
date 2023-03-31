//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const storyRoutes = require('./routes/storyRoutes');

const User = require('./models/user');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://0.0.0.0:27017/demos',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

//get the sign up form
app.get('/users/new', (req, res) => {
    res.render('user/new');
});

//create a new user
app.post('/', (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => res.redirect('/users/login'))
        .catch(err => next(err));
});

//get the login form
app.get('/users/login', (req, res) => {
    res.render('user/login');
});

//process login request
app.post('/users/login', (req, res, next) => {
    //authenticate the users login request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email stored
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                //user found in the database
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            res.redirect('/users/profile');
                        } else {
                            console.log('wrong password');
                            res.redirect('/users/login');
                        }
                    })
            } else {
                console.log('wrong email address');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
});

app.use('/stories', storyRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', { error: err });
});