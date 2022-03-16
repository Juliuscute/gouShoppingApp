const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const conn = require('../connection/conn');
const userMiddleware = require('../middleware/users.js');


//Registration route
router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
    conn.query(`SELECT * FROM customers WHERE LOWER(email) = LOWER(${conn.escape(req.body.email)});`,
        (err, result) => {
          if (result.length > 0) {
            return res.status(409).send({
              msg: 'This email is already registered'
            });
          } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  msg: err
                });
              } else {
                // has hashed pw => add to database
                conn.query(
                  `INSERT INTO customers (id, firstName, lastName, email, phone, password, registered) VALUES ('${uuid.v4()}', ${conn.escape(
                    req.body.firstName)}, ${conn.escape(req.body.lastName )}, ${conn.escape(req.body.email )}, ${conn.escape(req.body.phone_number )},
                     ${conn.escape(hash)}, now())`,
                  (err, result) => {
                    if (err) {
                      throw err;
                      return res.status(400).send({
                        msg: err
                      });
                    }
                    return res.status(201).send({
                      msg: 'Registeration successful'
                    });
                  }
                );
              }
            });
          }
        }
      );
});

//Login route
router.post('/login', (req, res, next) => {
  conn.query(
    `SELECT * FROM customers WHERE email = ${conn.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(req.body.password, result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                email: result[0].email,
                userId: result[0].id
              },
              'twinkletwinleluckystarforgoushoppingapp', {
                expiresIn: '7d'
              }
            );
            conn.query(
              `UPDATE customers SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});


router.get('/checkout', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;