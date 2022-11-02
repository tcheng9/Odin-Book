const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        placeholder: {type: String}
    }
)

module.exports = mongoose.model('profile', ProfileSchema);