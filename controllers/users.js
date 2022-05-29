const User = require('../models/user');

// Showing the new user registeration form
module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

// Registering a new user
module.exports.register = async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user, password);
        // Automatically login a user after registeration
        req.login(registeredUser,(err)=>{
            if(err) return next(err);
            req.flash('success','Welcome to Yelp Camp');
            res.redirect('/campgrounds');
        })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

// Renders the login form
module.exports.renderLogin = (req,res)=>{
    res.render('users/login');
}

// Logging user in
module.exports.login =  (req,res)=>{
    req.flash('success','Welcome Back!');
    // Returning the sure to the right URL after logging in
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// Logging user out
module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success','Goodbye!');
    res.redirect('/campgrounds');
}

