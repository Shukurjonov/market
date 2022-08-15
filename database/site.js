const { database } = require('./connection');

class Site {
  static async updatePhoneNumber(params) {
    const sql = `
      UPDATE
        site
      SET
        phone_number = $1
      RETURNING phone_number;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  };

  static async updateAddress(params) {
    const sql = `
      UPDATE
        site
      SET
        address = $1
      RETURNING address;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateWorkTime(params) {
    const sql = `
      UPDATE
        site
      SET
        work_time = $1
      RETURNING work_time;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateTelegramLink(params) {
    const sql = `
      UPDATE
        site
      SET
        telegram_link = $1
      RETURNING telegram_link;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateInstagramLink(params) {
    const sql = `
      UPDATE
        site
      SET
        instagram_link = $1
      RETURNING instagram_link;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }
}

module.exports = Site;