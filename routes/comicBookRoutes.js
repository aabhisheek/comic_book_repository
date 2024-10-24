const express = require('express');
const ComicBook = require('./../models/comicBook'); // Make sure the path is correct
const router = express.Router();
const CustomError = require('./../utils/customError'); // Adjust the path as needed
const catchAsync = require('./../utils/catchAsync');
const { getAllComics, getComicById,createComic,updateComic,deleteComic } = require('../Controllers/comicController');



// Create a new comic book
router.route('/').post(createComic);

// Edit a comic book
router.patch('/:id',updateComic);

// Delete a comic book
router.delete('/:id',deleteComic);

// Fetch comic book list with pagination, filtering, and sorting
router.route('/').get(getAllComics);


router.get('/:id',getComicById);


// Export the router
module.exports = router;
