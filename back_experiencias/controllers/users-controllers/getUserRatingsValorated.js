"use strict";
const repository = require("../../repositories/users-repository");

async function getUserRatingsValorated(req, res, next) {
  try {
    const { id } = req.params; //id= req.auth.id
    const valorated = await repository.valorate(id);
    res.send(valorated);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserRatingsValorated;
