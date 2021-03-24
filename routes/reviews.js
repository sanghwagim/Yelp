const express = require('express');
const router = express.Router({mergeParams : true});

const catchAsync = require('../ultils/CatchAsync');

const Campground = require('../models/campground');
const Review = require('../models/review');

const {validateReview, isLoggedIn, isreviewAuthor } = require('../middleware.js');
const reviews = require('../constrollers/reviews');


// const validateReview = (req, res, next) => { 
//     const { error } = reviewSchema.validate(req.body);
    
//     if(error) { 
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400);
//          } else { 
//              next();
//          }
    
//     }
    



router.post('/', validateReview, isLoggedIn, catchAsync (reviews.newReview));

router.delete('/:reviewId', isLoggedIn, isreviewAuthor, catchAsync(reviews.deleteReview));

 

module.exports = router;