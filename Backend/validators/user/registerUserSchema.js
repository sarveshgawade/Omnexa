import Joi from "joi";

const registerUserSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .label("Full Name"),

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

  phoneNumber: Joi.string()
    .trim()
    .required()
    .label("Phone Number")
    .messages({
      "string.pattern.base": "Phone Number must be a valid 10-digit number",
    }),

  role: Joi.string()
    .valid("USER", "ADMIN")
    .default("USER")
    .label("Role"),
});

export default registerUserSchema;
