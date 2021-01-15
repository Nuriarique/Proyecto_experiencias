"use strict";
const repository = require("../../repositories/activity-repository");

async function getActivitiesAdmin(req, res, next) {
  try {
    const { type } = req.query;

    if (type) {
      const activities = await repository.getActsAdminFilter(type);
      res.send(activities);
    } else {
      const activities = await repository.getActsAdmin();
      res.send(activities);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = getActivitiesAdmin;
