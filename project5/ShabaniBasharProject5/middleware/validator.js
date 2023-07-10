const mongoose = require('mongoose');
const { body } = require('express-validator');
const validator = require('validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
};

exports.validateCreateEvent = [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('location').trim().notEmpty(),
    body('start').custom((value) => {
        if (!validator.isISO8601(value)) {
            throw new Error('Invalid date format');
        }
        const now = new Date();
        const start = new Date(value);
        if (start <= now) {
            throw new Error('Event start date must be after current date');
        }
        return true;
    }),
    body('end').custom((value, { req }) => {
        if (!validator.isISO8601(value)) {
            throw new Error('Invalid date format');
        }
        const start = new Date(req.body.start);
        const end = new Date(value);
        if (end <= start) {
            throw new Error('Event end date must be after start date');
        }
        return true;
    }),
    body('email').normalizeEmail(),
    body('email').isEmail(),
    body('category').isIn([
        'Music',
        'Art',
        'Food',
        'Sports',
        'Technology',
        'Film',
        'Other',
    ]),
    body('rsvp').isIn(['YES', 'NO', 'MAYBE']),
    body('password').optional().isLength({ min: 8, max: 64 }),
    body('*').escape(),
];

exports.validateUpdateEvent = [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('location').optional().trim().notEmpty(),
    body('start').optional().custom((value) => {
        if (!validator.isISO8601(value)) {
            throw new Error('Invalid date format');
        }
        const now = new Date();
        const start = new Date(value);
        if (start <= now) {
            throw new Error('Event start date must be after current date');
        }
        return true;
    }),
    body('end').optional().custom((value, { req }) => {
        if (!validator.isISO8601(value)) {
            throw new Error('Invalid date format');
        }
        const start = new Date(req.body.start);
        const end = new Date(value);
        if (end <= start) {
            throw new Error('Event end date must be after start date');
        }
        return true;
    }),
    body('email').optional().normalizeEmail(),
    body('email').optional().isEmail(),
    body('category').optional().isIn([
        'Music',
        'Art',
        'Food',
        'Sports',
        'Technology',
        'Film',
        'Other',
    ]),
    body('rsvp').optional().isIn(['YES', 'NO', 'MAYBE']),
    body('password').optional().isLength({ min: 8, max: 64 }),
    body('*').escape(),
];