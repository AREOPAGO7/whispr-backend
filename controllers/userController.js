const User = require('../models/User');


const getUsers = async (req, res) => {
    const { uid } = req.body; // The user UID will be in the body
  
    // Validate the UID
    if (!uid) {
      return res.status(400).json({ error: 'UID is required in the request body.' });
    }
  
    try {
      // Fetch the user from MongoDB
      const user = await User.findOne({ uid });
  
      // Check if the user exists
      if (!user) {
        return res.status(200).json({ user: null }); // Return null if user not found
      }
      
      // Return the user data (excluding sensitive information like passwords)
      const userData = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      };
  
      return res.status(200).json({ user: userData });
    } catch (error) {
      console.error('Error fetching user:', error); // Log the error for debugging
      return res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
  };


const createUser = async (req, res) => {
    try {
        const { uid, name, email, profilePicture } = req.body;
        if (!uid || !name || !email) {
          return res.status(400).json({ error: 'UID, name, and email are required.' });
        }
    
        const existingUser = await User.findOne({
          $or: [{ uid }, { email }],
        });
    
        if (existingUser) {
          return res.status(400).json({ error: 'User with this UID or email already exists.' });
        }
            const user = new User({
          uid,
          name,
          email,
          profilePicture: profilePicture || '', // Default to an empty string if not provided
        });
    
        const savedUser = await user.save();
    
        return res.status(201).json({ message: 'User created successfully', user: savedUser });
      } catch (error) {
        return res.status(500).json({ error: `Error creating user: ${error.message}` });
      }
};

module.exports = { getUsers, createUser };