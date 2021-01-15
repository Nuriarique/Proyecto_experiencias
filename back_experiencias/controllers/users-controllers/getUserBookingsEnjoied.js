"use stric";

const repository = require("../../repositories/users-repository");

async function getUserBookingsEnjoied(req, res, next) {
  try {
    const { id } = req.params; //req.auth

    const enjoied = await repository.getEnjoied(id);

    res.send({ disfrutadas: enjoied });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserBookingsEnjoied;
