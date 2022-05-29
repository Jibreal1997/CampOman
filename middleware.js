const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

// Middleware for checking if logged in
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // URL to return to after logging in
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be signed in');
       return res.redirect('/login');
    }
    next();
}

// Middleware for validating campground Schema
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// Middleware for checking campground author or not
module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id))
    {
        req.flash('error','You do not have persmission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// Middleware for validating review schema
module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// Middleware for checking review author or not
module.exports.isReviewAuthor = async(req,res,next)=>{
    // one is campground ID and the other is review ID
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id))
    {
        req.flash('error','You do not have persmission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
