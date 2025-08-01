const express = require('express');
const router = express.Router();

// GET: Show registration form
router.get('/register', (req, res) => {
  res.render('register'); // Renders views/register.ejs
});

// POST: Handle registration form submission
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Log submitted data (temporary)
  console.log('🆕 Registered User:', email, password);

  // TODO (in production):
  // - Validate input
  // - Check if email already exists
  // - Hash password using bcrypt
  // - Save user to database

  res.send('✅ Registration successful!');
});

module.exports = router;
