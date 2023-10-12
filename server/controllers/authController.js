const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate a token
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token for successful login
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
