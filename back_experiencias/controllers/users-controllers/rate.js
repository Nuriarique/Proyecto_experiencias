"use strict";
const Joi = require("joi");
const uRepository = require("../../repositories/users-repository");
const aRepository = require("../../repositories/activity-repository");

async function rate(req, res, next) {
  try {
    const { id, idAct, rating } = req.params;
    const schema = Joi.number().min(1).max(5).integer().required();
    await schema.validateAsync(rating);

    //comprobar si ya se ha realizado la actividad
    const enjoied = await aRepository.activityBeforeToday(idAct);
    if (!enjoied) {
      const error = new Error(
        "Aun no se puede realizar la valoración, no se ha realizado la actividad"
      );
      error.status = 400;
      throw error;
    }

    await uRepository.insertRate(rating, id, idAct);

    res.send("actividad valorada con exito");
  } catch (error) {
    next(error);
  }
}

module.exports = rate;
