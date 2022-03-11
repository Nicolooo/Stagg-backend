const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    username:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    Color:{
        type: String,
        default: '#333'
    }
})

module.exports = mongoose.model('User', userSchema);