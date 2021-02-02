"use strict";
//! Comprobar en front si es necesaria esta ruta

const repository = require("../../repositories/users-repository");

async function getUserRatingsNoValorated(req, res, next) {
  try {
    const { id } = req.params; //id= req.auth.id

    const noValorated = await repository.notValorate(id);

    res.send({ noValorated });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserRatingsNoValorated;
