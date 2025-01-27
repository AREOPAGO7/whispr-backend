const User = require('../models/User');


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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