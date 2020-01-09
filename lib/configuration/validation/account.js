import Joi from 'joi';

export default Joi.object().keys({
    password: Joi.string().allow('')
});
