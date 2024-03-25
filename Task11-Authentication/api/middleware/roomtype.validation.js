const { roomTypeSchemaValidation } = require('../../validation');


module.exports = (req, res, next) => {
    const { error } = roomTypeSchemaValidation.validate(req.body);
    if(error){
        return res.status(401).json({
            message: error
        })
    }else{
        next();
    }
}