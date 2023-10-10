import mongoose from 'mongoose';

const jobsiteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    isMisc:{
        type: Boolean,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    totalHoursSoFar:{
        type: Number,
        required: true
    },
    subscribers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createDate:{
        type: Date,
        required: true
    },
});

const Jobsite = mongoose.model('Jobsite', jobsiteSchema);

export default Jobsite;