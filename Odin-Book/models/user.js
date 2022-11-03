const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendsRequests: {type: String},
        friends: {type: String},
        facebookId: {type: String}
    }
)

var User = UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('user', UserSchema);