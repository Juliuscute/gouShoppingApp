// middleware/users.js
const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    // firstName min length 3
    if (!req.body.firstName || req.body.firstName.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a first name with min. 3 characters'
      });
    }
    // lastName min length 3
    if (!req.body.lastName || req.body.lastName.length < 3) {
        return res.status(400).send({
          msg: 'Please enter a last name with min. 3 characters'
        });
      }
       // email min length 5
    if (!req.body.email || req.body.email.length < 5) {
        return res.status(400).send({
          msg: 'Please enter a email with min. 5 characters'
        });
      }
      // phone number min length 3
    if (!req.body.phone_number || req.body.phone_number.length < 11) {
        return res.status(400).send({
          msg: 'Please enter a phone number with min. 11 characters'
        });
      }
    // password min 8 chars
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 8 characters'
      });
    }
    // password (confirm) does not match
    if (
      !req.body.passwordConfirm ||
      req.body.password != req.body.passwordConfirm
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
  },

  // middleware/users.js
isLoggedIn: (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'twinkletwinleluckystarforgoushoppingapp');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  }
}

};










