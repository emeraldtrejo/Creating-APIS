const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

    
mongoose.connect('mongodb+srv://node-shop-boss:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-cjd73.mongodb.net/test?retryWrites=true&w=majority',
 {
    useMongoClient: true
});

//incoming request has to go through app.use and everything we pass through it
//request response next
// app.use((req, res, next) => {
//     res.status(200).json({
//         message:'It works'
//     });
// });

//tells us how long the request took 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
//extract josn data for us
app.use(bodyParser.json());

//funnel all the requests first 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //which headers will be sent with the request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    //so other routes can take over
    next();
});

//this is a filter, anything starting with /products will be forwarded to this file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//handle error requests that reach this line
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;