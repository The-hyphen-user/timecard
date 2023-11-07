import mongoose from 'mongoose';

const userActivationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  activationKey: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUsed: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserActivation = mongoose.model('UserActivation', userActivationSchema);

export default UserActivation;
