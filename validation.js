// fix the bug here
const Joi = require('joi');
const registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        username: Joi.string().min(1).max(255).required(),
        avatar: Joi.string(),
        date: Joi.date(),
        Color: Joi.string()
    });
    return schema.validate(data)
}
const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data)
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;