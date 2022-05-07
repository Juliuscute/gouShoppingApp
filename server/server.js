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

//Handle production
if(process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/dist'));

    //Handle Single Page Application (SPA)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}



//Listen on environment port or 5000
app.listen(port, () => console.log(`listenning on port ${port}`));