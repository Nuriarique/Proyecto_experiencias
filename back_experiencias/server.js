"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { SERVER_PORT, NODE_ENV } = process.env;

const { usersControllers, activityControllers } = require("./controllers");
const middlewares = require("./middlewares");

//declaraciones
const app = express();

//Middleware de log a consola en modo desenvolver
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middlewares -- Esto se debe cambiar más adelante (el .json)!!!
app.use(bodyParser.json());

//rutas usuario
app.post("/register", usersControllers.register);
app.post("/login", usersControllers.login);
app.get("/user/data", middlewares.validateAuth, usersControllers.getUserById);
app.put("/user/:id/data", usersControllers.editUser); //auth
app.get("/user/:id/booking", usersControllers.getUserBookings); //auth
app.get("/user/:id/booking/enjoied", usersControllers.getUserBookingsEnjoied); //auth
app.get(
  "/user/:id/booking/noEnjoied",
  usersControllers.getUserBookingsNoEnjoied
); //auth
app.get("/user/:id/rate", usersControllers.getUserRatings); //auth
app.get("/user/:id/rate/valorated", usersControllers.getUserRatingsValorated); //auth
app.get(
  "/user/:id/rate/noValorated",
  usersControllers.getUserRatingsNoValorated
); //auth
app.put("/user/:id/rate/:idAct/:rating", usersControllers.rate); //auth
//delete??? borrar/cancelar una actividad contratada

//rutas admin // incluir middle: validateAuth, isAdmin  en las inferiores
app.get("/admin/activities", activityControllers.getActivitiesAdmin);
app.post("/admin/createAct", activityControllers.createAct);
app.put("/admin/:actId", activityControllers.updateAct);
//------------------------------------------------------------
app.delete("/admin/:actId", activityControllers.deleteAct);
/* Limitación: no se puede borrar si la actividad está contratada */

//rutas actividad
// app.get("/?localition=... & type=...", datos actividades destacadas y ciudades emblematicas) (busqueda por tipo y/o ubicación)
// get /?localition=lugo & type=... & valoracion=...(busqueda  Con filtros)
app.get("/activity/:id", activityControllers.getActivity);
app.get(
  "/activity/:id/contract",
  middlewares.validateAuth,
  activityControllers.contractActivity
);
app.post(
  "/activity/:idUser/:idAct/contract",
  activityControllers.confirmContract
); //auth

//middleware gestión de errores
app.use(middlewares.errors);

//middleware página no encontrada
app.use(middlewares.notFound);

//listener
app.listen(SERVER_PORT, () => {
  console.log(`Escuchando el servidor ${SERVER_PORT}`);
});
