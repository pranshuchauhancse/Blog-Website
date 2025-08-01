const express = require('express');
const router = express.Router();

// Display the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle form submission
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log('🆕 Registered User:', email, password);
  // TODO: Store in DB, hash password, etc.
  res.send('✅ Registration successful!');
});

module.exports = router;
