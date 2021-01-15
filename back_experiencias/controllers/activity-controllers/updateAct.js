"use strict";

const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/activity-repository");

async function updateAct(req, res, next) {
  try {
    const { actId } = req.params;
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

    // Validaciones
    const schema = Joi.object({
      actId: Joi.number().positive(),
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

    await schema.validateAsync({
      actId,
      name_act,
      type_act,
      photo_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      localition,
    });

    // Buscar la actividad
    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("actividad no encontrada");
      error.status = 404;
      throw error;
    }

    // Actualizamosen la bbdd
    await repository.updateAct(
      name_act,
      type_act,
      photo_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      localition,
      actId
    );
    const actUpdated = await repository.getActivity(actId);

    res.send(actUpdated);
  } catch (error) {
    next(error);
  }
}

module.exports = updateAct;
