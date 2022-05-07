const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require('multer');
const uuid = require("uuid");
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const conn = require("../connection/conn");
const userMiddleware = require("../middleware/users.js");


//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false })); //handling form submission


//Registration route
router.post("/register", userMiddleware.validateRegister, (req, res, next) => {
  conn.query(
    `SELECT * FROM customers WHERE LOWER(email) = LOWER(${conn.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length > 0) {
        return res.status(409).send({
          msg: "This email is already registered",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            conn.query(
              `INSERT INTO customers (id, firstName, lastName, role, email, address, phone, password, registered, last_login) VALUES ('${uuid.v4()}', ${conn.escape(
                req.body.firstName
              )}, ${conn.escape(req.body.lastName)}, 'User', ${conn.escape(
                req.body.email
              )}, ${conn.escape(req.body.address)}, ${conn.escape(
                req.body.phone_number
              )},
                     ${conn.escape(hash)}, now(), 'no data')`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({ msg: err });
                }
                return res.status(201).send({
                  msg: "Registeration successful",
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
router.post("/login", (req, res, next) => {
  conn.query(
    `SELECT * FROM customers WHERE email = ${conn.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
                userId: result[0].id,
              },
              "twinkletwinleluckystarforgoushoppingapp",
              {
                expiresIn: "7d",
              }
            );
            conn.query(
              `UPDATE customers SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
            
          }
          // if(result[0].role == Admin) {
          //   return res.status(200).send({
          //     msg: "Logged in!",
          //     token,
          //     user: result[0],
          //   });
          // }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

// router.get('/checkout', userMiddleware.isLoggedIn, (req, res, next) => {
//  // res.send('This is the secret content. Only logged in users can see that!');
// });

router.post("/order", (req, res, next) => {
  conn.query(
    `INSERT INTO orders (cart, customerId, customerEmail, customerName, customerPhone, totalPrice, paystackReference, shippingMode, shippingFee, shippingAddress, status, orderTime) VALUES (${conn.escape(
      req.body.cart
    )}, ${conn.escape(req.body.customerId)}, ${conn.escape(
      req.body.customerEmail
    )}, ${conn.escape(req.body.customerName)}, ${conn.escape(
      req.body.customerPhone
    )}, 
      ${conn.escape(req.body.total)}, ${conn.escape(
      req.body.paystackReference
    )},
      ${conn.escape(req.body.shippingMode)}, ${conn.escape(
      req.body.shippingFee
    )}, ${conn.escape(req.body.shippingAddress)}, 'to be processed', now())`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "Payment successful",
      });
    }
  );
});

// Update user profile route
router.put("/update", (req, res) => {
  const sql =
    "UPDATE customers SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
  conn.query(
    sql,
    [
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      req.body.customerId,
    ],
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: "something went wrong" });
      } else {
        conn.query(
          `SELECT * FROM customers WHERE id = ${conn.escape(
            req.body.customerId
          )};`,
          (err, result) => {
            if (err) {
              console.log(error);
            } else {
              return res
                .status(201)
                .send({ msg: "profile updated successfully", user: result[0] });
            }
          }
        );
      }
    }
  );
});

// Update order status route
router.put("/updateOrderStatus", (req, res) => {
  const sql = "UPDATE orders SET status = ? WHERE order_id = ?";
  conn.query(sql, ["processed", req.body.orderId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).send({ msg: "Operation Succeeded" });
    }
  });
});

//Change Password route
router.put("/passwordChange", userMiddleware.checkPassword, (req, res) => {
  conn.query(
    `SELECT * FROM customers WHERE id = ${conn.escape(req.body.customerId)};`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Please enter the correct current password" });
      } else {
        // compare password
        bcrypt.compare(
          req.body.currentPassword,
          result[0]["password"],
          (bErr, bResult) => {
            if (bResult) {
              //Update password
              bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                  return res.status(400).json({ msg: "something went wrong try again" });
                } else {
                  sql = "UPDATE customers SET password = ? WHERE id = ?";
                  conn.query(sql,[hash, req.body.customerId],
                    (pErr, pResult) => {
                      if (pErr) {
                        return res.status(400).json({ msg: "something went wrong" });
                      } else {
                        return res.status(200).send({ msg: "Password changed successfully" });
                      }
                    }
                  );
                }
              });
            } else {
              return res.status(400).json({ msg: "Please enter the correct current password" });
            }
          }
        );
      }
    }
  );
});

// Getting all product from database
router.get("/fetch", (req, res) => {
  const sql = " SELECT * FROM products"
  conn.query(sql, function(err, rows) {
    if(err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  }) 
})

//Getting all users from databse
router.get("/getUsers", (req, res) => {
  const sql = " SELECT COUNT(*)  as 'count' FROM customers"
  conn.query(sql, function(err, rows) {
    if(err) {
      console.log(err);
    } else {
      res.json(rows[0].count);
    }
  }) 
})


// Getting orders from database
router.get('/getOrders', (req, res) => {
  const sql = "SELECT * FROM orders"
  conn.query(sql, function(err, rows) {
    if(err) {
      throw err
    } else {
      res.json(rows);
    }
  })
})


// Getting pending orders
router.get('/getPendingOrders', (req, res) => {
  const sql = "SELECT COUNT(*) as 'count' FROM orders WHERE status = 'to be processed'"; 
  conn.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      res.json(rows[0].count);
    }
  })
})

const fileFilter = (req, file, callBack) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("wrong file type");
    error.code = "INCORRECT FILETYPE";
    return callBack(error, false);
  }
  callBack(null, true);
  // if(fileSize > MAX_SIZE) {
  //   const error = new Error("File too large")
  //   error.code = ""
  // }
}



//! Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, '../client/public/uploads');   // './public/images/' directory name to save the file
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + "--" + file.originalname);
  }
})
const MAX_SIZE = 500000;
const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
});

//Sending products to database
router.post("/upload", upload.single('product_image'), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
  } else {

    const sql = `INSERT INTO products (product_image, product_name, product_price, product_category, product_description) VALUES ("${req.file.filename}", "${req.body.product_name}", "${req.body.product_price}", "${req.body.product_category}", "${req.body.product_description}")`;
    conn.query(sql, function (err, result) {

      //Middleware that runs when error callback happens
      router.use((error, req, res, next) => {
        if (error.code === "INCORRECT FILETYPE") {
          return res.status(422).send({ error: "Only images are allowed" });
        }
        if (error.code === "LIMIT_FILE_SIZE") {
          return  res.status(422).send({ error: `Too large. Max size is ${MAX_SIZE / 1000}kb` });   
        }
      });

      if (err) throw err
      //res.json([true,results]) //.insertId
      return res.send({ message: 'Product has been uploaded' })
    })
  }
});   


module.exports = router;
