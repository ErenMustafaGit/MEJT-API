const Joi = require('joi');

const createTeamSchema = Joi.object({
	name: Joi.string().required(),
    athletes: Joi.array().items(Joi.object({
        email: Joi.string().email().required(),
    }))});

module.exports = createTeamSchema;