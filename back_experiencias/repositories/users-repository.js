"use strict";

const db = require("../infrastructure/database");
const pool = db.getPool();

async function getUserByEmail(email) {
  const connection = await pool.getConnection();
  const query = "SELECT * FROM users WHERE email = ?";
  const [user] = await connection.query(query, email);

  connection.release();
  return user[0];
}

async function createUser(nombre, fecha, email, password) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO users(first_name,b_day,email,passwords) values (?,?,?,?)";
  const [create] = await connection.query(query, [
    nombre,
    fecha,
    email,
    password,
  ]);

  connection.release();
  return create;
}

async function getUsersById(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT first_name, last_name, sexo, b_day, dni, email, tlfn, bio, photo_user FROM users WHERE id = ?";
  const [user] = await connection.query(query, id);

  connection.release();
  return user[0];
}

async function editUsers(nombre, apellido, dni, tlfn, bio, foto, sexo, id) {
  const connection = await pool.getConnection();
  const query =
    "UPDATE users SET first_name = ?, last_name = ?, dni = ?, tlfn = ?, bio = ?, photo_user = ?, sexo =? WHERE id = ?";
  const [user] = await connection.query(query, [
    nombre,
    apellido,
    dni,
    tlfn,
    bio,
    foto,
    sexo,
    id,
  ]);

  connection.release();
  return user[0];
}

async function getEnjoied(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT a.photo_act, a.name_act FROM activity a JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE c.id_user = ? and a.d_start < current_date()";

  const [user] = await connection.query(query, id);
  return user;
}

async function getEnjoy(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT a.photo_act, a.name_act FROM activity a JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE c.id_user = ? and a.d_start > current_date()";

  const [user] = await connection.query(query, id);
  return user;
}

async function getEnjoyByActId(id_user, id_act) {
  const connection = await pool.getConnection();
  const query =
    "SELECT * FROM register_contract_activity WHERE id_user = ? AND id_activity = ?";

  const [user] = await connection.query(query, [id_user, id_act]);
  return user[0];
}

async function notValorate(id_user) {
  const connection = await pool.getConnection();
  const query =
    "SELECT a.name_act, a.photo_act, c.rating FROM activity a JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE c.id_user = ? and c.rating IS NULL";

  const [user] = await connection.query(query, id_user);
  return user;
}

async function valorate(id_user) {
  const connection = await pool.getConnection();
  const query =
    "SELECT a.name_act, a.photo_act, c.rating FROM activity a JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE c.id_user = ? and c.rating IS NOT NULL";

  const [user] = await connection.query(query, id_user);
  return user;
}

async function insertRate(rating, id_user, id_activity) {
  const connection = await pool.getConnection();
  const query =
    "UPDATE register_contract_activity SET rating = ? WHERE id_user = ? AND id_activity = ? AND rating IS NULL";

  const [user] = await connection.query(query, [rating, id_user, id_activity]);
  return user;
}

module.exports = {
  getUserByEmail,
  createUser,
  getUsersById,
  editUsers,
  getEnjoied,
  getEnjoy,
  getEnjoyByActId,
  notValorate,
  valorate,
  insertRate,
};