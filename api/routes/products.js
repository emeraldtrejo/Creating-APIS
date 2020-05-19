const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//handle incoming get requests
//this will be for /products
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) =>{
// const product = {
//         name: req.body.name,
//         price: req.body.price
//     };
//create new isntance of model
const product = new Product({
    //will auto create a new id
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
});
product.save()
.then(result => {
    console.log(result);
})

.catch(err => console.log(err));

res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(201).json({
            message: 'You discovered the special ID',
            id: id
        });
    }else {
        res.status(200).json({
    message: 'You passed an ID'
    });    
  }
});

router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Update Product'
    });
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted Product'
    });
});



module.exports = router;