import Joi from 'joi';

export const createDestinationSchema = Joi.object({
  city: Joi.string().required(),
  country: Joi.string().required(),
  countryCode: Joi.string().length(2).uppercase().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  timezone: Joi.string().required(),
});

export const updateDestinationSchema = Joi.object({
  city: Joi.string(),
  country: Joi.string(),
  countryCode: Joi.string().length(2).uppercase(),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  timezone: Joi.string(),
}).min(1);
