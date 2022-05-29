const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

// Making a review
router.post('/', isLoggedIn, validateReview, catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    // Setting the author for the review
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async(req,res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;
