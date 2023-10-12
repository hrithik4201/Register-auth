const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply the authMiddleware to a specific route
router.get('/userDetails', authMiddleware, (req, res) => {
  // Access the decoded user information using req.user
  const { email, username } = req.user;

  // Send a JSON response with the username and email directly
  res.json({ username, email });
});

module.exports = router;
