const User = require('../models/user');

exports.newUserForm = (req, res) => {
    res.render('user/new');
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        req.session.userId = user._id;
        res.redirect('/users/profile');
    } catch (error) {
        res.render('user/new', { error });
    }
};

exports.loginForm = (req, res) => {
    res.render('user/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        req.flash('error', 'Invalid email or password');
        res.redirect('/users/login');
    } else {
        req.session.userId = user._id;
        res.redirect('/users/profile');
    }
};

exports.viewProfile = async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render('user/profile', { user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
