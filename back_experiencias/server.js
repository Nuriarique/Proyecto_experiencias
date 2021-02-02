"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const { SERVER_PORT, NODE_ENV } = process.env;

const { usersControllers, activityControllers } = require("./controllers");
const middlewares = require("./middlewares");

//declaraciones
const app = express();

// enable files upload
app.use(fileUpload());

app.use("/uploads", express.static("public"));

//Middleware de log a consola en modo desenvolver
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middlewares -- Esto se debe cambiar más adelante (el .json)!!!
app.use(bodyParser.json());

//rutas usuario
app.post("/register", usersControllers.register);
app.put("/validate", usersControllers.validateUser);
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
app.put("/user/:id/rate/:actId/:rating", usersControllers.rate); //auth

//rutas admin // incluir middle: validateAuth, isAdmin  en las inferiores
app.get("/admin/activities", activityControllers.getActivitiesAdmin);
app.post("/admin/createAct", activityControllers.createAct);
app.put("/admin/:actId", activityControllers.updateAct);
app.delete("/admin/:actId", activityControllers.deleteAct);

//rutas actividad
app.get("/", activityControllers.home, activityControllers.search); //datos ciudades emblematicas en el front)
app.get("/search", activityControllers.search);
app.get("/activity/:actId", activityControllers.getActivity);
app.get(
  "/activity/:actId/contract",
  middlewares.validateAuth,
  activityControllers.contractActivity
);
app.post(
  "/activity/:userId/:actId/contract",
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
