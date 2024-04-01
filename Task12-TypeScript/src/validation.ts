import Joi from 'joi';

export const userSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

export const roomSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    room_type: Joi.string().length(24).required(),
    price: Joi.number().integer().required()
});

export const roomTypeSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(20).required()
});

export default {userSchemaValidation, roomSchemaValidation, roomTypeSchemaValidation }