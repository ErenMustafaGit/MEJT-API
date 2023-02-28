const Joi = require('joi');

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().required(),
	password: Joi.string().min(6).required(),
	type: Joi.string().alphanum().min(0).max(1).required(),
});

module.exports = registerSchema;
