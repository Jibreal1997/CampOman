const Campground = require('../models/campground');


// Finds all the campgrounds and renders them
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

// Renders the new campground form
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

// Creates a new campground
module.exports.createCampgrounds = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename}))
    // Adding the author to the campground upon creation of campground
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`)
}

// Shows the individual campground page
module.exports.showCampground = async(req, res,) => {
    // Going inside campground schema and populating its review(authors) and it authors fields
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');

    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

// Renders the edit campground form
module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id)
    // Checking if campground exists or not
    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

// Updates the Campground details
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success','Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

// Deleting the Campground
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted campground!');
    res.redirect('/campgrounds');
}