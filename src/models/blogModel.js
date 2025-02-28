const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    titre: String,
    contenu: String,
    datePublication: Date
});

const Blog = mongoose.model('Blog' , BlogSchema);

module.exports = Blog;