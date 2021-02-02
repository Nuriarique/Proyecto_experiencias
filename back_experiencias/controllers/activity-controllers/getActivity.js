"use strict";
const Joi = require("joi");
const repository = require("../../repositories/activity-repository");
const { isBefore } = require("date-fns");

async function getActivity(req, res, next) {
  try {
    const { actId } = req.params;
    const schema = Joi.number().positive();
    await schema.validateAsync(actId);

    //Comprobamos que la actividad existe en la bd
    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("No existe la actividad");
      error.status = 404;
      throw error;
    }

    // Comprobamos que la actividad no ha pasado de fecha
    const now = new Date();
    const before = isBefore(act.d_start, now);
    if (before) {
      const error = new Error("Actividad no disponible, ya ha pasado la fecha");
      error.status = 400;
      throw error;
    }

    //Valoraciones de la actividad
    const type = act.type_act;
    const ratings = await repository.getRating(type);

    //Plazas disponibles
    const places = await repository.getPlaces(actId);

    res.send({ act: act, valoraciones: ratings, plazas: places });
  } catch (error) {
    next(error);
  }
}

module.exports = getActivity;
