import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    address: String,
    content: String,
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    from: String,
    TransactionID: String,
    MessageID: String,



})

const Email = mongoose.model('Email', emailSchema);

export default Email;
