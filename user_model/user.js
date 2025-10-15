const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByUsernameOrEmail(identifier) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [identifier, identifier]
    );
    return rows[0];
  }

  static async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
