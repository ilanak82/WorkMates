// repositories/userRepository.js

const sql = require("mssql");
const { poolPromise } = require("../config/db");

// Get user by username (used in auth and profile fetch)
async function getUserByUsername(username) {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT * FROM tblUser WHERE username = @username");
    return result.recordset[0];
}

// Create a new user (used in registration)
async function createUser({ username, email, password }) {
    const pool = await poolPromise;
    await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .query(`
      INSERT INTO tblUser (username, email, password)
      VALUES (@username, @email, @password)
    `);
}

// Get user profile info (excluding sensitive data)
async function getUserProfileByUsername(username) {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT id, username, email, name FROM tblUser WHERE username = @username");
    return result.recordset[0];
}

// Update user profile info
async function updateUserProfile(username, { name, email }) {
    const pool = await poolPromise;
    await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email)
        .query(`
      UPDATE tblUser
      SET name = @name, email = @email
      WHERE username = @username
    `);
}

// Delete user (you can modify this for soft-delete later)
async function deleteUser(username) {
    const pool = await poolPromise;
    await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("DELETE FROM tblUser WHERE username = @username");
}

module.exports = {
    getUserByUsername,
    createUser,
    getUserProfileByUsername,
    updateUserProfile,
    deleteUser,
};
