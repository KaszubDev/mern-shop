import express from 'express'
import Product from '../models/product'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const router = express.Router()
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price category producer _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    category: doc.category,
                    producer: doc.producer,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        producer: req.body.producer,
        productImage: req.file.path
    })
    product.save().then(result => {
        res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                category: result.category,
                producer: result.producer,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + result._id
                }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .select('name price category producer _id productImage')
    .exec().then(doc => {
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:5000/products/'
                }
            })
        } else {
            res.status(404).json({
                message: 'Invalid productId passed. Does not found any object.'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({_id: id}, { $set: updateOps }).exec()
    .then(result => {
        res.status(200).json({
            message: 'Product has been updated',
            request: {
                type: 'GET',
                url: 'http://localhost:5000/products/' + id
            }
        })
    })
    .catch(err => res.status(500).json({
        error: err
    }))
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router