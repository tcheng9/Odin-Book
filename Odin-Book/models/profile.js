const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        placeholder: {type: String}
    }
)

module.exports = mongoose.model('post', PostSchema);