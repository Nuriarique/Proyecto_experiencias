"use strict";

const Joi = require("joi");
const repository = require("../../repositories/users-repository");

async function editUser(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni, tlfn, bio, foto, sexo } = req.body;

    const schema = Joi.object({
      id: Joi.number().positive(),
      nombre: Joi.string().required(),
      apellido: Joi.string(),
      dni: Joi.string().min(9).max(9),
      tlfn: Joi.number().max(999999999).positive(),
      bio: Joi.string(),
      foto: Joi.string(),
      sexo: Joi.string().min(1).max(1),
    });
    await schema.validateAsync({
      id,
      nombre,
      apellido,
      dni,
      tlfn,
      bio,
      foto,
      sexo,
    });

    //buscar el usuario
    const user = await repository.getUsersById(id);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }
    // actualizamos en la bd
    await repository.editUsers(
      nombre,
      apellido,
      dni,
      tlfn,
      bio,
      foto,
      sexo,
      id
    );
    const userUpdate = await repository.getUsersById(id);
    res.send(userUpdate);
  } catch (error) {
    next(error);
  }
}

module.exports = editUser;
