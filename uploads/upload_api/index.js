const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const conn = require('./connection/conn');
const cors = require('cors');




const app = express();
app.use(cors());
const port = process.env.PORT || 5000;



//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //handling form submission


const fileFilter = function (req, file, callBack) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return callBack(error, false);
  }
  callBack(null, true);
}



//! Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, '../../public/uploads');   // './public/images/' directory name where save the file
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
// add routes
const router = require('./routes/router.js');
app.use('/api', router);

//Sending products to database
app.post("/upload", upload.single('product_image'), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
  } else {

    const sql = `INSERT INTO products (product_image, product_name, product_price, product_category, product_description) VALUES ("${req.file.filename}", "${req.body.product_name}", "${req.body.product_price}", "${req.body.product_category}", "${req.body.product_description}")`;
    conn.query(sql, function (err, result) {

      //Middleware that runs when error callback happens
      app.use(function (err, req, res, next) {
        if (err.code === "LIMIT_FILE_TYPES") {
          return res.status(422).send({ error: "Only images are allowed" });
        }
        if (err.code === LIMIT_FILE_SIZE) {
          return  res.status(422).send({ error: `Too large. Max size is ${MAX_SIZE / 1000}kb` });   
        }
      });

      if (err) throw err
      //res.json([true,results]) //.insertId
      return res.send({ message: 'Product has been uploaded' })
    })
  }
})   


// Getting all product from database
app.get("/fetch", (req, res) => {
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
app.get("/getUsers", (req, res) => {
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
app.get('/getOrders', (req, res) => {
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
app.get('/getPendingOrders', (req, res) => {
  const sql = "SELECT COUNT(*) as 'count' FROM orders WHERE status = 'to be processed'"; 
  conn.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      res.json(rows[0].count);
    }
  })
})

//Listen on environment port or 5000
app.listen(port, () => console.log(`listenning on port ${port}`));