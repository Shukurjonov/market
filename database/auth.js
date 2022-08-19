const { database } = require('./connection');

class Auth {

  static async login(params) {
    const sql = ` 
      SELECT
        u.id,
        user_firstname,
        user_lastname,
        username,
        r.name role_name
      FROM users u
      LEFT JOIN role r on r.id = u.role_id
      WHERE username = $1 AND user_password = md5(md5($2::text));
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async register(params) {
    const sql = `
      INSERT INTO users (
        user_firstname,
        user_lastname,
        username,
        user_password, 
        role_id)
      VALUES ($1, $2, $3, md5(md5($4::text)), $5)
      RETURNING id, user_firstname, user_lastname, username, role_id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Auth;