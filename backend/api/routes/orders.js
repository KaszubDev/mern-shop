import express from 'express'
import Order from '../models/order'
import Product from '../models/product'

const router = express.Router()

router.get('/', (req, res, next) => {
    Order.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/orders/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if ( !product ) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        const order = new Order({
            product: req.body.productId,
            quantity: req.body.quantity
        })
        return order.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'Order created',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:5000/orders/' + result._id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id)
    .select('_id product quantity')
    .exec().then(doc => {
        if (doc) {
            res.status(200).json({
                order: doc,
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:5000/orders/'
                }
            })
        } else {
            res.status(404).json({
                message: 'Not found an order of given ID'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    Order.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router