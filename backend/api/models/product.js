import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)