"use strict";
const Joi = require("joi");
const repository = require("../../repositories/activity-repository");

async function contractActivity(req, res, next) {
  try {
    const { id } = req.params; //req.auth
    const schema = Joi.number().positive();
    await schema.validateAsync(id);

    //Si estan todas las plazs ocupadas no se puede contratar
    const places = await repository.getPlaces(id);
    if ((places.PlazasLibres = 0)) {
      const error = new Error("No quedan plazas libres");
      error.status = 400;
      throw error;
    }

    const resumen = await repository.contract(id);
    res.send(resumen);
  } catch (error) {
    next(error);
  }
}

module.exports = contractActivity;
