// import UserModel from "../../models/UserModel";
const User = require('../../models/UserModel');

const createUser = async (username, email, password) => {
    try {
      // Create a new user document
      const user = new User({
        username,
        email,
        password,
      });
  
      // Save the user to the database
      await user.save();
  
      console.log('User created successfully:', user);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  
  module.exports = { createUser }