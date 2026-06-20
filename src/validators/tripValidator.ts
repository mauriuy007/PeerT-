import Joi from 'joi';

export const createTripSchema = Joi.object({
  name: Joi.string().min(2).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  ownerId: Joi.number().integer().positive().required(),
});

export const updateTripSchema = Joi.object({
  name: Joi.string().min(2),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
}).min(1);

export const addParticipantSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  role: Joi.string().valid('OWNER', 'MEMBER').required(),
});
