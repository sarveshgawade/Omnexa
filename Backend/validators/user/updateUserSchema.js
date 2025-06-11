import Joi from "joi";

const updateUserSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .label("Full Name"),

email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }) 
    .label("Email"),

  phoneNumber: Joi.string()
    .trim()
    .label("Phone Number")
    .messages({
      "string.pattern.base": "Phone Number must be a valid 10-digit number",
    }),

});

export default updateUserSchema;
