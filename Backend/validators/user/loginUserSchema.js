import Joi from "joi";

const loginUserSchema = Joi.object({

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }) 
    .required()
    .label("Email"),

  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .label("Password"),

});

export default loginUserSchema;
