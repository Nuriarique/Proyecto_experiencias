"use strict";
const Joi = require("joi");
const repository = require("../../repositories/users-repository");

async function getUserById(req, res, next) {
  try {
    const userId = req.auth.id;

    const user = await repository.getUsersById(userId);

    if (!user) {
      const error = new Error("Usuario no existe");
      error.status = 404;
      throw error;
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserById;
