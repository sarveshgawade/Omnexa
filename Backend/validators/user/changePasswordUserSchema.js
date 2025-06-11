import Joi from "joi";

const changePasswordUserSchema = Joi.object({

  oldPassword: Joi.string()
    .trim()
    .min(6)
    .required()
    .label("Old Password"),

  newPassword: Joi.string()
    .trim()
    .min(6)
    .required()
    .label("New Password"),

});

export default changePasswordUserSchema;
