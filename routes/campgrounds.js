const express = require('express');
const router = express.Router();
const catchAsync = require('../ultils/CatchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ejsMate = require('ejs-mate');
const {isLoggedIn, validateCampground, isAuthor}  = require('../middleware');
const campgrounds = require('../constrollers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });




// const upload = multer().single('image')

router.route('/')  
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync (campgrounds.createCampground));
    // .post(upload.array('image'),(req, res)=> { 
    //     res.send('it worked');
    //     console.log(req.body, req.files)
    // })



    // .post((req, res)=> { 
    //     res.send(req.file);
    // })
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync (campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync (campgrounds.newCampground))
    .delete(isLoggedIn, isAuthor, catchAsync (campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));



module.exports = router; 