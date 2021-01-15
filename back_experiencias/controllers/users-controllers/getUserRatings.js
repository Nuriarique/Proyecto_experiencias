"use strict";
const repository = require("../../repositories/users-repository");

async function getUserRatings(req, res, next) {
  try {
    const { id } = req.params; //id= req.auth.id

    const noValorated = await repository.notValorate(id);
    const noValoratedFilter = noValorated.filter(
      (noValorated, index) => index < 2
    );
    const valorated = await repository.valorate(id);
    const valoratedFilter = valorated.filter((Valorated, index) => index < 2);

    res.send({ valoradas: valoratedFilter, PorValorar: noValoratedFilter });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserRatings;
