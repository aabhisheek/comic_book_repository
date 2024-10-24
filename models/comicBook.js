const mongoose = require('mongoose');

// Define the comic book schema
const comicBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book name is required!'],
        unique: true,
        trim: true,
        maxlength: [150, 'Book name should not exceed 150 characters'],
    },
    author: {
        type: String,
        required: [true, 'Author name is required!'],
        trim: true,
    },
    publicationYear: {
        type: Number,
        required: [true, 'Year of publication is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be less than 0'],
        max: [100, 'Discount cannot be more than 100'],
    },
    numberOfPages: {
        type: Number,
        required: [true, 'Number of pages is required!'],
        min: [1, 'Number of pages must be at least 1'],
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
        required: [true, 'Condition is required!'],
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Virtual property to calculate the effective price after discount
comicBookSchema.virtual('effectivePrice').get(function() {
    return this.price - (this.price * (this.discount / 100));
});

// Pre-save middleware to set a default value or log information if necessary
comicBookSchema.pre('save', function(next) {
    this.createdAt = Date.now();
    next();
});

// Create the ComicBook model
const ComicBook = mongoose.model('ComicBook', comicBookSchema);

module.exports = ComicBook;
