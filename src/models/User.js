import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: false,
    minlength: 6
  },
  fullname: {
    type: String,
    required: false,
    trim: true
  },
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  oauthProviders: [{
    provider: {
      type: String,
      enum: ['google', 'github']
    },
    providerId: String,
    connectedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;