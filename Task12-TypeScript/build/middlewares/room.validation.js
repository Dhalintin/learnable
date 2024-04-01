"use strict";
const { roomSchemaValidation } = require('../validation.ts');
module.exports = (req, res, next) => {
    const { error } = roomSchemaValidation.validate(req.body);
    if (error) {
        return res.status(401).json({
            message: error
        });
    }
    else {
        next();
    }
};
