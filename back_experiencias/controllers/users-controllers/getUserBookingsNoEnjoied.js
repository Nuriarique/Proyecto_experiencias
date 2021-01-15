"use stric";

const repository = require("../../repositories/users-repository");

async function getUserBookingsNoEnjoied(req, res, next) {
  try {
    const { id } = req.params; //req.auth

    const enjoy = await repository.getEnjoy(id);

    res.send({ PorDisfrutar: enjoy });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserBookingsNoEnjoied;
