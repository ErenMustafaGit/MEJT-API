const createHttpError = require('http-errors');

const Validators = require('../validators');

module.exports = function(validator) {

	// eslint-disable-next-line no-prototype-builtins
	if(!Validators.hasOwnProperty(validator))
		throw new Error(`'${validator}' validator is not exist`);

	return async function(req, res, next) {
		try {
			const validated = await Validators[validator].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			if(err.isJoi) 
				return next(createHttpError(422, {message: err.message}));
			next(createHttpError(500));
		}
	};
};