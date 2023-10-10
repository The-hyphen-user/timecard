import mongoose from 'mongoose';

const recoverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    }
});

const Recovery = mongoose.model('Recovery', recoverySchema);

export default Recovery;