const mongoose = require('mongoose');

const roomTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true}
})


const RoomTypeModel = mongoose.model('RoomType', roomTypeSchema);

export default RoomTypeModel;