const express = require('express');
const router = express.Router();
const { products } = require('../models')
const { reviews } = require('../models');

router.post('/add', async (req, res) => {
    const { name, image, category, description, price, countInStock, rating } = req.body;
    const productData = await products.create({
        name: name,
        image: image,
        category: category,
        description: description,
        price: price,
        countInStock: countInStock,
        rating: rating
    })
    res.json(productData);
})

router.get('/getallproducts', async (req, res) => {
    const getAllProducts = await products.findAll();
    res.send(getAllProducts);
});

router.get('/getproductbyid/:id', async (req, res) => {
    const id = req.params.id;
    const product = await products.findByPk(id);
    res.send(product);
})


router.post('/addreview', async (req, res) => {
    const { review, productid, currentUser } = req.body;

    const product = await products.findByPk(productid);

    const reviewData = await reviews.create({
        productid: productid,
        userid: currentUser.userid,
        name: currentUser.username,
        comment: review.comment
    })
    res.json(reviewData);
})

router.post('/getallreviews', async (req, res) => {
    const productid = req.body.pid;
    const review = await reviews.findAll({
        where: {
            productid: productid
        }
    });
    res.send(review);
});

router.post('/addproduct', async (req, res) => {
    const { product } = req.body;

    const productData = await products.create({
        name: product.name,
        image: product.image,
        category: product.category,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
        rating: product.rating
    })
    res.json(productData);
})

router.post('/updateproduct', async (req, res) => {
    const { productid, updatedproduct } = req.body;

    const productData = await products.update({
        name: updatedproduct.name,
        image: updatedproduct.image,
        category: updatedproduct.category,
        description: updatedproduct.description,
        price: updatedproduct.price,
        countInStock: updatedproduct.countInStock,
    }, { where: { productid: productid } });

    res.json('Success');

})

router.post("/deleteproduct", async (req, res) => {

    const { productid } = req.body;

    const deleteProduct = await products.destroy({
        where: { productid: productid }
    })
    res.json('Success');
});


module.exports = router;
