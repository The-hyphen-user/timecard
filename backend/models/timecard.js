import mongoose from 'mongoose';

const timecardSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    jobsite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobsite'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isProcessed: {
        type: Boolean,
        required: true
    },
    edits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimecardEdit'
    }]
});

const Timecard = mongoose.model('Timecard', timecardSchema);

export default Timecard;