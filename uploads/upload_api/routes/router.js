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
router.post('/login', (req, res, next) => {});

router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;