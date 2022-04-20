import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            name: {type: String, required: true},
            quantity: {type: String, required: true, default: 1},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
    },
    paymentMethod: {type: String, required: true},
    itemsPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: {type: Boolean, default: false},
    time : { type : Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)