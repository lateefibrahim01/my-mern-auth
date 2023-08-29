const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/jwt');
const transporter = require('../config/nodemailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      isConfirmed: false,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: 'Email Confirmation',
      text: `
        Thank you for registering with our app!
        Please click the following link to confirm your email:
        ${req.headers.origin}/api/auth/confirm/${token}
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.json({ msg: 'Registration successful. Please check your email for confirmation.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, secret);

    await User.findByIdAndUpdate(decoded.userId, { isConfirmed: true });

    res.json({ msg: 'Email confirmed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.isConfirmed) {
      return res.status(400).json({ msg: 'Email not confirmed' });
    }

    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = response.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: 'Google User',
        email,
        password: '', // Google login doesn't require a password
        isConfirmed: true,
      });

      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { register, confirmEmail, login, googleLogin };
