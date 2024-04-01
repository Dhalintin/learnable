const { userSchemaValidation } = require('../../validation');


module.exports = (req, res, next) => {
    const { error } = userSchemaValidation.validate(req.body);
    if(error){
        return res.status(401).json({
            message: error
        })
    }else{
        next();
    }
}