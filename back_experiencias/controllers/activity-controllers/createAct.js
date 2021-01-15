"use strict";
const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/activity-repository");

async function createAct(req, res, next) {
  try {
    const schema = Joi.object({
      name_act: Joi.string().required(),
      type_act: Joi.string().required(),
      photo_act: Joi.string().required(),
      description_act: Joi.string().required(),
      summary_act: Joi.string().required(),
      places: Joi.number().positive().min(1).required(),
      price: Joi.number().positive().min(1).precision(2).required(),
      d_start: Joi.date().format("YYYY-MM-DD").required(),
      localition: Joi.string().required(),
    });
    await schema.validateAsync(req.body);

    const {
      name_act,
      type_act,
      photo_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      localition,
    } = req.body;

    const act = await repository.createAct(
      name_act,
      type_act,
      photo_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      localition
    );

    res.send({ id: act });
  } catch (error) {
    next(error);
  }
}

module.exports = createAct;
