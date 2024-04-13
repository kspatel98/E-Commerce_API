const express = require('express')
const router = express.Router()
const Product = require('../models/product')
//Getting all
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Getting one
router.get('/:id', getProducts, (req, res) => {
    res.send(res.product)
})

//Creating one
router.post('/', async (req, res) => {
    console.log("req.body: ", req.body)
    
    try {
        if (Array.isArray(req.body)) {
            
            const products = req.body.map(product => {
                if (!product.name || !product.price || !product.description || !product.images || !product.merchantName || !product.merchantLocation) {
                    return res.status(400).json({ message: "Name, price, description, images, isFeatured, merchantName, and merchantLocation are required fields." });
                }
                return new Product({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    images: product.images,
                    isFeatured: product.isFeatured,
                    merchantName: product.merchantName,
                    merchantLocation: product.merchantLocation
                })
            })
            const newProducts = await Product.insertMany(products);
            res.status(201).json(newProducts)
        }
        else {
            if (!req.body.name || !req.body.price || !req.body.description || !req.body.images || !req.body.merchantName || !req.body.merchantLocation) {
                return res.status(400).json({ message: "Name, price, description, images, isFeatured, merchantName, and merchantLocation are required fields." });
            }
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                images: req.body.images,
                isFeatured: req.body.isFeatured,
                merchantName: req.body.merchantName,
                merchantLocation: req.body.merchantLocation
            })
            const newProduct = await product.save();
            res.status(201).json(newProduct)
        }
        

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

    
})

//Updating one
router.patch('/:id', getProducts, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    if (req.body.description != null) {
        res.product.description = req.body.description
    }
    if (req.body.images != null) {
        res.product.images = req.body.images
    }
    if (req.body.isFeatured==true || req.body.isFeatured==false) {
        res.product.isFeatured = req.body.isFeatured
    }
    if (req.body.merchantName != null) {
        res.product.merchantName = req.body.merchantName
    }
    if (req.body.merchantLocation != null) {
        res.product.merchantLocation = req.body.merchantLocation
    }
    try {
        if (!req.body.name && !req.body.price && !req.body.description && !req.body.images && !req.body.isFeatured && !req.body.merchantName && !req.body.merchantLocation) {
            return res.status(400).json({ message: "Fields are missing to update.." });
        }
        let updatedProduct = await res.product.save() 
        res.status(200).json({message:"Product updated successfully.."})
    }
    catch (error) {
        res.status(400).json(error.message)
    }
})

//Deleting one
router.delete('/:id', getProducts, async (req, res) => {
    try {
        let remove = await Product.deleteOne(res.product)
        if (remove.acknowledged) {
            res.json({ message: "Product has been deleted successfully.." })
        }
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})

async function getProducts(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.product = product
    next()
}
module.exports = router