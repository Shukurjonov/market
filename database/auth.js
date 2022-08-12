const { database } = require('./connection');

class Auth {

  static async login(params) {
    const sql = ` 
      SELECT
        u.id,
        user_firstname,
        user_lastname,
        username,
        r.name
      FROM users u
      LEFT JOIN role r on r.id = u.role_id
      WHERE username = $1::varchar AND user_password = md5(md5($2::text));
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
      VALUES ($1::varchar, $2::varchar, $3::varchar, md5(md5($4::text)), $5::int)
      RETURNING id, user_firstname, user_lastname, username, role_id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Auth;