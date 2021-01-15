"use strict";

const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/users-repository");
const { differenceInYears } = require("date-fns");
const bcrypt = require("bcryptjs");
const mailgun = require("mailgun-js");
const { API_KEY_MAILGUN, DOMAIN_MAILGUN } = process.env;

async function register(req, res, next) {
  try {
    const { nombre, fechaNac, email, password } = req.body;
    
    const schema = Joi.object({
      nombre: Joi.string().required(),
      fechaNac: Joi.date().format("YYYY-MM-DD").required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
      repeatPassword: Joi.ref("password"),
    });
    await schema.validateAsync(req.body);

    // comprobamos edad +18
    const now = new Date();
    const dateNac = new Date(fechaNac);
    const diference = differenceInYears(now, dateNac);
    if (diference < 18) {
      const error = new Error("Debes ser mayor de edad");
      error.status = 400;
      throw error;
    }

    //comprobar si el email existe
    const user = await repository.getUserByEmail(email);
    if (user) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 400;
      throw error;
    }

    //encriptar password
    const passwordHash = await bcrypt.hash(password, 10);
    const id = await repository.createUser(
      nombre,
      fechaNac,
      email,
      passwordHash
    );

    //enviar email
    const mg = mailgun({ apiKey: API_KEY_MAILGUN, domain: DOMAIN_MAILGUN });
    const data = {
      from: "Excited User <me@samples.mailgun.org>",
      to: "nuriarique@gmail.com",
      subject: "Hello",
      text: "Testing some Mailgun awesomness!",
    };
    await mg.messages().send(data);

    res.send({ userId: id.insertId });
  } catch (error) {
    next(error);
  } 
}

module.exports = register;


