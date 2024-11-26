const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');

  const createUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
        const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
        const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        email,
        password: hashedPassword, // Save hashed password
      });
  
      // Save the user to the database
      await user.save();
  
      console.log('User created successfully:', user);
      return res.status(201).json({ message: 'User created successfully', user });
  
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const register = (req, res) => {
    res.render('templates/auth/register', { title: 'Register' });
  };
  module.exports = {
    createUser,register,
  };