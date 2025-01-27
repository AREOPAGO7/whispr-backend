
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uid: { 
      type: String, 
      required: true, 
      unique: true // Firebase Authentication UID 
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    profilePicture: { 
      type: String, 
      default: '' // Profile picture URL 
    }
  },
  {
    timestamps: true // Adds `createdAt` and `updatedAt` automatically
  }
);

module.exports = mongoose.model('User', userSchema);
