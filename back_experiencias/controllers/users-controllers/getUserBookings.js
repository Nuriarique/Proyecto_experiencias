"use stric";

const repository = require("../../repositories/users-repository");

async function getUserBookings(req, res, next) {
  try {
    const { id } = req.params; //req.auth

    // Filtramos para que solo nos muestre 2
    const enjoieds = await repository.getEnjoied(id);
    const enjoiedFilter = enjoieds.filter((enjoied, index) => index < 2);
    
    const enjoys = await repository.getEnjoy(id);
    const enjoyFilter = enjoys.filter((enjoy, index) => index < 2);

    res.send({ disfrutadas: enjoiedFilter, PorDisfrutar: enjoyFilter });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserBookings;
