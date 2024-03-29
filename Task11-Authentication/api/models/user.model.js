const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'guest'],
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);