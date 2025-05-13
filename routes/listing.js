const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn, isOwner,validateTesting} = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const {storage } = require('../cloudConfig.js')
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image]"), validateTesting, wrapAsync(listingController.createListing));

router.get('/new' ,isLoggedIn, listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateTesting, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

// edit route

router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports = router;