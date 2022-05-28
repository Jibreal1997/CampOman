const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

// Will add username, password and salt field to the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);