const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        authorId: {type: Schema.Types.ObjectId, ref: 'user'},
        commentId: {type: String},
        message: {type: String},
        likes: {type: [{type: String}]}, //How to deal with likes counts and likes users?
        timestamp: {type: String}
    }
)
//postId: {type: Schema.Types.ObjectId, ref: 'post'},
module.exports = mongoose.model('post', PostSchema);