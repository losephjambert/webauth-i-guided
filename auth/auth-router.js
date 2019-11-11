const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let credentials = req.body;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(credentials.password, salt, async (err, hash) => {
        credentials.password = hash;
        const saved = await Users.add(credentials);
        res.status(201).json(saved);
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    bcrypt.compare(password, user.password, (err, hashMatch) => {
      if (hashMatch) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
