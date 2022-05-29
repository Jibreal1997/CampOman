const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');

// Index Page
router.get('/', catchAsync(campgrounds.index));

// New Campground Form
router.get('/new',isLoggedIn, catchAsync(campgrounds.renderNewForm));

// Creating new Campground
router.post('/', isLoggedIn,validateCampground, catchAsync(campgrounds.createCampgrounds));

// Showing one Campground
router.get('/:id', catchAsync(campgrounds.showCampground));

// Edit Campground Form
router.get('/:id/edit', isLoggedIn,  isAuthor, catchAsync(campgrounds.renderEditForm));

// Updating Campground
router.put('/:id',isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// Deleting Campground
router.delete('/:id',isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;