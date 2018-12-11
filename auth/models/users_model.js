var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    B1: String,
    B2: String,
    B3: String,
    B4: String,
    B5: String,
    B6: String,
    B7: String,
    B8: String,
    B9: String,
    B10: String,
    hashed_password: String
});
mongoose.model('User', UserSchema);