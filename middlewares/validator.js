const { check, body } = require('express-validator');
const User = require('../models/User');

module.exports = {
	validateRegister: () => {
		return [
			check('username', 'Please provide 6 character long username').isLength({min: 6}),
		    check('username', 'Please provide a username shoter than 32 characters').isLength({max: 32}),
		    check('username', 'Please provide a username').not().isEmpty(),
		    check('email', 'Invalid email address').isEmail(),
		    check('email', 'Please provide an email').not().isEmpty(),
		    check('password', 'Please provide 6 character long password').isLength({min: 6}),
		    check('password', 'Please provide a password shoter than 32 characters').isLength({max: 32}),
		    check('password', 'Please provide a password').not().isEmpty(),
		    check('passwordConfirm').custom((value, { req }) => {
	            if (value !== req.body.password) {
	                throw new Error("Passwords confirmation does not match the password");
	            } else {
	                return value;
	            }
	        }),
		    check('passwordConfirm', 'Please provide 6 character long passwordConfirm').isLength({min: 6}),
		    check('passwordConfirm', 'Please provide a passwordConfirm shoter than 32 characters').isLength({max: 32}),
		    check('passwordConfirm', 'Please provide a passwordConfirm').not().isEmpty()
		];
	},
	validateLogin: () => {
		return [
			check('email', 'Invalid email address').isEmail(),
			check('email', 'Please provide an email').not().isEmpty(),
		    check('password', 'Please provide a password').not().isEmpty()
		];
	},
	validateUpdateUser: () => {
		return [
		    check('userName', 'Please provide a userName').not().isEmpty(),
		    check('email', 'Invalid email address').isEmail(),
		    check('email', 'Please provide an email').not().isEmpty().custom(async (value, { req }) => {
				const user = await User.findOne({ email: value, _id: {$ne: req.params.userId} });
				if (user) {
					throw new Error("Email already in use");
				} else {
					return value;
				}
			})
		];
	},
	validateAddBook: () => {
		return [
		    check('title', 'Please provide a title').not().isEmpty(),
		    check('price', 'Please provide a price').not().isEmpty(),
		    check('inStore', 'Please provide a number book in store').not().isEmpty(),
		];
	},
	validateUpdateBook: () => {
		return [
		    check('title', 'Please provide a title').not().isEmpty(),
		    check('price', 'Please provide a price').not().isEmpty(),
		    check('inStore', 'Please provide a number book in store').not().isEmpty(),
		];
	},
}