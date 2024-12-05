const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');

  const createUser = async (req, res) => {
    const { username, email, password,roles } = req.body;
  
    try {
      if (!username || !email || !password || !roles) {
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
        roles,
      });
  
      // Save the user to the database
      await user.save();
      req.session.user={
        id:user._id,
        username:user.username,
        email:user.email,
        roles:user.roles[0]

      }
  
      console.log('User created successfully:', user);
      return res.redirect('/dashboard');

      // return res.status(201).json({ message: 'User created successfully', user });
  
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const register = (req, res) => {
    res.render('templates/auth/register', { title: 'Register' });
  };

  const logout =(req,res)=>{
    req.session.destroy((error)=>{
      if(error)
      {
        console.error('Error while destroying session:', err);
        return res.status(500).send('An error occurred while logging out.');
      }
    });
    res.clearCookie('connect.sid');
    res.redirect('/');
  }



  const login122=async(req,res)=>{
const {email,password}=req.body;
console.log(email);
try{
  if(!email || !password)
  {
    return res.status(400).json({erroe:'Email and password are required'});
    const user=await User.findOne({email});
    console.log(user);
    if(!user)
    {
      return res.status(401).json({error:'Invalid email'});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid)
    {
      return res.status(401).json({error:'Invalid password'});
    }
  
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log('User logged in successfully:', req.session.user);
    return res.redirect('/dashboard');


  }
  
}
catch (error) {
  console.error('Error during login:', error.message);
  return res.status(500).json({ error: 'Internal server error' });
}

  }

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
        req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        roles:user.roles[0]

      };
  
      console.log('User logged in successfully:', req.session.user);
      return res.redirect('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };



  module.exports = {
    createUser,register,logout,login,
  };