const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, text: true},
    room_type: {type: mongoose.Schema.Types.ObjectId, ref: 'RoomType'},
    price: {type: Number}
});

const RoomModel = mongoose.model('Room', RoomSchema);

export default RoomModel;