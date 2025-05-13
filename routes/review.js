const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controllers/review.js');

//reviews //post route

router.post('/',validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

//reviews //dlt route

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router