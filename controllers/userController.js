const userModel = require('../models/userModel')
const { checkSchema, validationResult } = require('express-validator');



exports.findAllUsers = (req, res) => {
    try {
        const users = userModel.findAll();
        res.json(users)
    } catch (error) {
        throw new Error(`Error getting users.`)
    }
}

exports.createUser = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }


    try {
        const { ime, prezime, email = "", brojTelefona = "" } = req.body;

        const newUser = userModel.create({
            ime,
            prezime,
            email,
            brojTelefona
        })

        res.status(201).json(newUser)
    } catch (error) {
        throw new Error(`Error creating new user.`)
    }
}

exports.updateUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    try {
        const { ime, prezime, email, brojTelefona } = req.body;

        const updatedUser = userModel.update(
            req.params.id,
            {
                ime,
                prezime,
                email,
                brojTelefona
            })

        if (!updatedUser) {
            res.status(404).json({ error: `Could not find user with the specified id:${id}` });
        }

        res.json(updatedUser);
    } catch (error) {
        throw new Error(`Error updating the user with id:${id}`);
    }
}

exports.deleteUser = (req, res) => {
    try {
        const deletedUserId = userModel.delete(req.params.id)

        if (!deletedUserId) {
            res.status(404).json({ error: `Could not find user with the specified id:${id}` });
        }

        res.json({
            id: deletedUserId
        });
    } catch (error) {
        throw new Error(`Error deleting the user with id:${id}`);
    }
}


exports.validateCreateUser = checkSchema({
    ime: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Ime is required',
        },
        isString: {
            errorMessage: 'Ime must contain only letters',
        },
        trim: true
    },
    prezime: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Prezime is required',
        },
        isString: {
            errorMessage: 'Prezime must contain only letters',
        },
        trim: true
    },
    email: {
        in: ['body'],
        optional: true,
        isEmail: {
            errorMessage: 'Valid email is required',
        },
        normalizeEmail: true,
    },
    brojTelefona: {
        in: ['body'],
        optional: true,
        isString: true,
        matches: {
            options: /^[0-9\s\-+()]+$/,
            errorMessage: 'Invalid broj telefona format',
        }
    }
});

exports.validateUpdateUser = checkSchema({
    ime: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Ime must contain only letters',
        },
        trim: true
    },
    prezime: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Prezime must contain only letters',
        },
        trim: true
    },
    email: {
        in: ['body'],
        optional: {
            options: { checkFalsy: true },
        },
        isEmail: {
            errorMessage: 'Valid email is required',
        },
        normalizeEmail: true,
    },
    brojTelefona: {
        in: ['body'],
        optional: {
            options: { checkFalsy: true },
        },
        isString: true,
        matches: {
            options: /^[0-9\s\-+()]+$/,
            errorMessage: 'Invalid broj telefona format',
        }
    }
});