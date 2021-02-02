"use strict";

const userRepository = require("../../repositories/users-repository");
const activityRepository = require("../../repositories/activity-repository");
const { isBefore } = require("date-fns");

async function confirmContract(req, res, next) {
  try {
    const { userId, actId } = req.params; //userId = req.auth.id

    //comprobar que existe la actividad
    const act = await activityRepository.getActivity(actId);
    if (!act) {
      const error = new Error("Actividad no encontrada");
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

    //comprobar si existe contrato
    const existContract = await userRepository.getEnjoyByActId(userId, actId);
    if (existContract) {
      const error = new Error("Ya tienes contratada esta actividad");
      error.status = 400;
      throw error;
    }

    await activityRepository.confirmContract(userId, actId);

    res.send({ message: "Actividad contrada con éxito!" });
  } catch (error) {
    next(error);
  }
}

module.exports = confirmContract;
