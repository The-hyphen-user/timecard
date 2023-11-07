import mongoose from 'mongoose';

const timecardEditSchema = new mongoose.Schema({
  timecard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timecard',
  },
  newHours: {
    type: Number,
    required: true,
  },
  newStartTime: {
    type: Date,
    required: true,
  },
  newEndTime: {
    type: Date,
    required: true,
  },
  newDescription: {
    type: String,
    required: true,
  },
  isProcessed: {
    type: Boolean,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
});

const TimecardEdit = mongoose.model('TimecardEdit', timecardEditSchema);

export default TimecardEdit;
