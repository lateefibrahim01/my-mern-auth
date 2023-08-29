const express = require('express');
const router = express.Router();
const { register, confirmEmail, login, googleLogin } = require('../controllers/authController');

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.post('/google-login', googleLogin);

module.exports = router;
