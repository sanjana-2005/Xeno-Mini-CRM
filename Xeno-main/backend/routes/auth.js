const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    res.status(200).json({
      name: payload.name,
      email: payload.email,
      picture: payload.picture
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid Token", error: err });
  }
});

module.exports = router;
