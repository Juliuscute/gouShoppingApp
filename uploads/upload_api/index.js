const express = require('express');
const mysql = require('mysql');
const conn = require('./connection/conn');
const cors = require('cors');
const router = require('./routes/router.js');


const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// add routes
app.use('/api', router);


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //handling form submission


//Listen on environment port or 5000
app.listen(port, () => console.log(`listenning on port ${port}`));