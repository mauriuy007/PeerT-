import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string().min(2).max(30),
  lastName: Joi.string().min(2).max(30),
}).min(1);
