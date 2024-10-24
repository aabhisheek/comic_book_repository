const ComicBook = require('./../models/comicBook');
//so good error is handled that it is not shown in console.log
//directly error is handled and shown in postman 
//about this misisng import of model in comicBook

exports.createComic=async (req, res) => {
    try {
        const comicBook = await ComicBook.create(req.body);
        res.status(201).json({
            
            status: 'success',
            data: {
                comicBook,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};


exports.updateComic= async (req, res) => {
    try {
        const comicBook = await ComicBook.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                comicBook,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};


exports.deleteComic=async (req, res) => {
    try {
        await ComicBook.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};



exports.getAllComics= async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filterings
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = ComicBook.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const comicBooks = await query;

        res.status(200).json({
            status: 'success',
            results: comicBooks.length,
            data: {
                comicBooks,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};


// Route to get a comic book by its ID
exports.getComicById= async (req, res) => {
    try {
        const comicBook = await ComicBook.findById(req.params.id);

        if (!comicBook) {
            return res.status(404).json({
                status: 'fail',
                message: 'Comic book not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                comicBook,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};


