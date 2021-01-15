"use strict";
const Joi = require("joi");
const repository = require("../../repositories/activity-repository");

async function deleteAct(req, res, next) {
  try {
    const { actId } = req.params;
    const schema = Joi.number().positive();
    await schema.validateAsync(actId);

    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("Actividad no encontrada");
      error.status = 404;
      throw error;
    }

    await repository.deleteAct(actId);

    res.send({ message: "Actividad eliminada" });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteAct;
