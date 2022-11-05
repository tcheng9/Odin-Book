const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        authorId: {type: String},
        commentId: {type: String},
        message: {type: String},
        likes: {type: String}, //How to deal with likes counts and likes users?
        timestamp: {type: String}
    }
)

module.exports = mongoose.model('post', PostSchema);