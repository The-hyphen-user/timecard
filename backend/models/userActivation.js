import mongoose from 'mongoose';

const userActivationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
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
  isUsed: {
    type: Boolean,
    default: false,
  },

});

const UserActivation = mongoose.model('UserActivation', userActivationSchema);

export default UserActivation;
