import express from 'express'
import Order from '../models/order'
import { isAuth } from '../../util'

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
                    price: doc.totalPrice,
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

router.post('/', isAuth, (req, res, next) => {
    if (req.body.orderItems.length === 0) {
        res.status(404).json({
            message: 'Cart is empty'
        })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingData,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })
        order.save().then(newOrder => {
            res.status(201).json({
                message: 'New Order Created',
                createdOrder: newOrder,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/orders/' + newOrder._id
                }
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
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