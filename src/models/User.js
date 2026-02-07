import mongoose from 'mongoose';
import crypto from 'crypto';

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
  verificationToken: String,
  verificationTokenExpires: Date,
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

userSchema.methods.getVerificationToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationTokenExpires = Date.now() + 900000;

  //hash the token before saving to the database
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  this.verificationToken = hash;

  return token;
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;