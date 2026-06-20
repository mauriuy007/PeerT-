import Joi from 'joi';

export const createBookingSchema = Joi.object({
  tripId: Joi.number().integer().positive().required(),
  bookingType: Joi.string().valid('FLIGHT', 'HOTEL', 'CAR', 'EVENT').required(),
  provider: Joi.string().required(),
  reference: Joi.string().required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().required(),
  status: Joi.string().valid('CONFIRMED', 'PENDING', 'CANCELLED').required(),
});

export const updateBookingSchema = Joi.object({
  provider: Joi.string(),
  reference: Joi.string(),
  amount: Joi.number().positive(),
  currency: Joi.string().length(3).uppercase(),
  status: Joi.string().valid('CONFIRMED', 'PENDING', 'CANCELLED'),
}).min(1);
