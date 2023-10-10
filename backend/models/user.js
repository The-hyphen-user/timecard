import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true, // Ensures email addresses are unique in the database
        required: true, // Makes the email field required
        trim: true, // Removes whitespace from the beginning and end of the email address
    },
    password: String,
    role:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
