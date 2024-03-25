const { roomSchemaValidation } = require('../../validation');


module.exports = (req, res, next) => {
    const { error } = roomSchemaValidation.validate(req.body);
    if(error){
        return res.status(401).json({
            message: error
        })
    }else{
        next();
    }
}