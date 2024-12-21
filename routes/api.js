'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  publishedYear: Number,
  comments: [{ type: String }],
  commentcount: { type: Number, default: 0 }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        const books = await Book.find();
        res.json(books);
      } catch (err) {
        res.status(500).json({ error: "Server error - unable to retrieve library", details: err.message });
      }
    })
    .post(async (req, res) => {
      try {
        const { title, author, publishedYear, genre } = req.body;
        if (!title) return res.json("missing required field title");

        const newBook = new Book({
          title,
          author,
          publishedYear,
          genre,
          comments: [],
          commentcount: 0
        });

        const savedBook = await newBook.save();
        res.json({ title: savedBook.title, _id: savedBook._id });
      } catch (err) {
        res.status(500).json({ error: "Error saving the book", details: err.message });
      }
    })
    .delete(async (req, res) => {
      try {
        const result = await Book.deleteMany({});
        if (result.deletedCount === 0) return res.json("database appears to already be empty");
        res.json("complete delete successful");
      } catch (err) {
        res.status(500).json({ error: "Server error - unable to delete", details: err.message });
      }
    });

  app.route('/api/books/:id')
    .get(async (req, res) => {
      try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) return res.json("no book exists");

        res.json({
          title: book.title,
          _id: book._id,
          comments: book.comments
        });
      } catch (err) {
        res.status(500).json({ error: "Server error - unable to retrieve book", details: err.message });
      }
    })
    .post(async (req, res) => {
      try {
        const bookId = req.params.id;
        const { comment } = req.body;

        if (!comment) return res.json("missing required field comment");

        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { 
            $push: { comments: comment },
            $inc: { commentcount: 1 }
          },
          { new: true }
        );

        if (!updatedBook) return res.json("no book exists");

        res.json({
          title: updatedBook.title,
          _id: updatedBook._id,
          comments: updatedBook.comments
        });
      } catch (err) {
        res.json("no book exists");
      }
    })
    .delete(async (req, res) => {
      try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) return res.json("no book exists");

        res.json("delete successful");
      } catch (err) {
        res.json("no book exists");
      }
    });
};
