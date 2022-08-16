const { database } = require('./connection');

class Site {

  static async getSite() {
    const sql = `
      SELECT 
        phone_number,
        address_ru,
        address_uz,
        work_time_ru,
        work_time_uz,
        telegram_link,
        instagram_link
      FROM
        site
      `;

    const result = await database.query(sql);
    return result.rows || [];
  }

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
        address_ru = $1,
        address_uz = $2
      RETURNING address_ru, address_uz;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateWorkTime(params) {
    const sql = `
      UPDATE
        site
      SET
        work_time_ru = $1,
        work_time_uz = $2
      RETURNING work_time_ru, work_time_uz;
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