"use strict";
const register = require("./register");
const login = require("./login");
const getUserById = require("./getUserById");
const editUser = require("./editUser");
const getUserBookings = require("./getUserBookings");
const getUserBookingsEnjoied = require("./getUserBookingsEnjoied");
const getUserBookingsNoEnjoied = require("./getUserBookingsNoEnjoied");
const getUserRatings = require("./getUserRatings");
const getUserRatingsValorated = require("./getUserRatingsValorated");
const getUserRatingsNoValorated = require("./getUserRatingsNoValorated");
const rate = require("./rate");

module.exports = {
  register,
  login,
  getUserById,
  editUser,
  getUserBookings,
  getUserBookingsEnjoied,
  getUserBookingsNoEnjoied,
  getUserRatings,
  getUserRatingsValorated,
  getUserRatingsNoValorated,
  rate,
};
