const Joi = require('joi');

const userSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const roomSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    room_type: Joi.string().length(24).required(),
    price: Joi.number().integer().required()
});

const roomTypeSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(20).required()
});

module.exports = {userSchemaValidation, roomSchemaValidation, roomTypeSchemaValidation }