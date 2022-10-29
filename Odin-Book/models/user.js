const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendsRequests: {type: String},
        friends: {type: String},
    }
)

module.exports = mongoose.model('post', PostSchema);