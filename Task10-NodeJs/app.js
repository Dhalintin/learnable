require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const roomTypeRoute = require('./api/routes/roomtype');
const roomRoute = require('./api/routes/room');

// mongoose.connect(process.env.MONGODB_LINK);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})


app.use('/api/v1/roomtype', roomTypeRoute);
app.use('/api/v1/rooms', roomRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});
module.exports = app;