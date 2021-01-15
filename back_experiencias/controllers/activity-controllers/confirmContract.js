"use strict";

const userRepository = require("../../repositories/users-repository");
const activityRepository = require("../../repositories/activity-repository");

async function confirmContract(req, res, next) {
  try {
    const { idUser, idAct } = req.params; //idUser = req.auth.id

    const existContract = await userRepository.getEnjoyByActId(idUser, idAct);

    if (existContract) {
      const error = new Error("Ya tienes contratada esta actividad");
      error.status = 400;
      throw error;
    }

    await activityRepository.confirmContract(idUser, idAct);

    const getContract = await userRepository.getEnjoyByActId(idUser, idAct);
    res.send(getContract);
  } catch (error) {
    next(error);
  }
}

module.exports = confirmContract;
