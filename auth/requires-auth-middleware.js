const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.exports = async (req, res, next) => {
  let { username, password } = req.headers;
  if (username && password) {
    try {
      const user = await Users.findBy({ username }).first();
      bcrypt.compare(password, user.password, (err, hashMatch) => {
        if (hashMatch) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'ran into an error in the db. please try again later' });
    }
  } else {
    res.status(400).json({ message: 'Please provide your credentials' });
  }
};
