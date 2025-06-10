import Joi from 'joi';

// TODO validate dateFrom and dateTo in datePeriod
const schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    }),

    addComment: Joi.object({
        message: Joi.string().required()
    }),

    updatePost: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string())
    })
}

const validate = (schemaName) => {
    return (req, res, next) => {

        const schema = schemas[schemaName];

        if (!schema) {
            return next(new Error(`Schema ${schemaName} not found`));
        }

        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                code: 400,
                status: 'Bad Request',
                message: error.details[0].message,
                path: req.path
            });
        }

        next();
    }
}

export default validate;