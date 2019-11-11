const router = require('express').Router();

const bcrypt = require('bcryptjs');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/', (req, res) => {
  const password = req.body.password;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      // Store hash in your password DB.
      res.status(200).json({
        originalPassword: password,
        hashedPassword: hash,
      });
    });
  });
  // read the password from the body
  // hash the password using bcryptjs
  // return it to the user in an obkect that looks like
  // { password: 'original password', hashedPassword: 'hashed'}
});

module.exports = router;
