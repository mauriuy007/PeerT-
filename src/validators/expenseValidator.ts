import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  tripId: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().required(),
  category: Joi.string().valid('FOOD', 'TRANSPORT', 'LODGING', 'ACTIVITIES', 'OTHER').required(),
  date: Joi.date().iso().required(),
  itineraryItemId: Joi.number().integer().positive(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateExpenseSchema = Joi.object({
  amount: Joi.number().positive(),
  currency: Joi.string().length(3).uppercase(),
  category: Joi.string().valid('FOOD', 'TRANSPORT', 'LODGING', 'ACTIVITIES', 'OTHER'),
  date: Joi.date().iso(),
  itineraryItemId: Joi.number().integer().positive().allow(null),
  name: Joi.string(),
  description: Joi.string(),
}).min(1);
