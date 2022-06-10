const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.route('/')
    .get(catchAsync(campgrounds.index)) // Index Page
    // .post(isLoggedIn,validateCampground, catchAsync(campgrounds.createCampgrounds)) // Creating new Campground
    .post(upload.array('image'), (req,res)=>{
        console.log(req.body, req.files);
        res.send(req.body, req.files);
    })

// New Campground Form
router.get('/new',isLoggedIn, catchAsync(campgrounds.renderNewForm))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // Showing one Campground
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground)) // Updating Campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)) // Deleting Campground



// Edit Campground Form
router.get('/:id/edit', isLoggedIn,  isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;