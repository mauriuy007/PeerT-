import Joi from 'joi';

export const createItineraryItemSchema = Joi.object({
  tripId: Joi.number().integer().positive().required(),
  date: Joi.date().iso().required(),
  destinationId: Joi.number().integer().positive().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateItineraryItemSchema = Joi.object({
  date: Joi.date().iso(),
  destinationId: Joi.number().integer().positive(),
  name: Joi.string(),
  description: Joi.string(),
}).min(1);
