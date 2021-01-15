"use strict";

const db = require("../infrastructure/database");
const pool = db.getPool();

async function createAct(
  name_act,
  type_act,
  photo_act,
  description_act,
  summary_act,
  places,
  price,
  d_start,
  localition
) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO  activity(name_act,type_act,photo_act,description_act,summary_act,places,price,d_start,localition) values (?,?,?,?,?,?,?,?,?)";
  const [act] = await connection.query(query, [
    name_act,
    type_act,
    photo_act,
    description_act,
    summary_act,
    places,
    price,
    d_start,
    localition,
  ]);
  connection.release();
  return act.insertId;
}

async function getActsAdmin() {
  const connection = await pool.getConnection();
  const query =
    "SELECT id_activity, name_act, d_start, type_act FROM activity ORDER BY d_start ASC";
  const [act] = await connection.query(query);

  connection.release();
  return act;
}

async function getActsAdminFilter(type) {
  const connection = await pool.getConnection();
  const query =
    "SELECT id_activity, name_act, d_start, type_act FROM activity WHERE type_act LIKE ? ORDER BY d_start ASC";
  const [act] = await connection.query(query, type);

  connection.release();
  return act;
}

async function getActivity(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT name_act, type_act, photo_act, description_act, summary_act, places, price, d_start, localition FROM activity WHERE id_activity = ?";

  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function getRating(type_act) {
  const connection = await pool.getConnection();
  const query =
    "SELECT u.photo_user, c.rating FROM users u JOIN register_contract_activity c ON u.id = c.id_user JOIN activity a ON c.id_activity = a.id_activity WHERE a.type_act = ? LIMIT  6;";

  const [rat] = await connection.query(query, type_act);

  connection.release();
  return rat;
}

async function getPlaces(id_activity) {
  const connection = await pool.getConnection();
  const query =
    "SELECT COUNT(c.id_activity) AS PlazasOcupadas, a.places - COUNT(c.id_activity) AS PlazasLibres FROM activity a JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE c.id_activity = ? GROUP BY c.id_activity;";

  const [places] = await connection.query(query, id_activity);

  connection.release();
  return places[0];
}

async function updateAct(
  name_act,
  type_act,
  photo_act,
  description_act,
  summary_act,
  places,
  price,
  d_start,
  localition,
  id_activity
) {
  const connection = await pool.getConnection();
  const query =
    "UPDATE activity SET name_act = ?, type_act = ?, photo_act = ?, description_act = ?, summary_act = ?, places = ?, price = ?, d_start = ?, localition = ? WHERE id_activity = ?";
  const [act] = await connection.query(query, [
    name_act,
    type_act,
    photo_act,
    description_act,
    summary_act,
    places,
    price,
    d_start,
    localition,
    id_activity,
  ]);

  connection.release();
  return act[0];
}

async function deleteAct(id) {
  const connection = await pool.getConnection();
  const query = "DELETE FROM activity WHERE id_activity = ?";
  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function contract(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT summary_act AS Resumen, name_act AS Actividad, DATE_FORMAT(d_start, GET_FORMAT(DATE, 'EUR')) AS Fecha FROM activity WHERE id_activity = ?";
  const [act] = await connection.query(query, id);

  connection.release();
  return act;
}

async function confirmContract(id_user, id_activity) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO register_contract_activity(id_user,id_activity) values (?,?)";
  const [act] = await connection.query(query, [id_user, id_activity]);

  connection.release();
  return act;
}

async function activityBeforeToday(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT * FROM activity WHERE id_activity = ? AND d_start < current_date()";
  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}
module.exports = {
  createAct,
  getActsAdmin,
  getActsAdminFilter,
  getActivity,
  updateAct,
  deleteAct,
  getRating,
  getPlaces,
  contract,
  confirmContract,
  activityBeforeToday,
};
