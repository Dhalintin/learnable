const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, text: true},
    room_type: {type: mongoose.Schema.Types.ObjectId, ref: 'RoomType'},
    price: {type: Number}
})

module.exports = mongoose.model('Room', roomSchema);