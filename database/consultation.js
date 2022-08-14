const { database } = require('./connection');

class Consultation {
  static async getConsultation() {
    const sql = `
      SELECT
        id consultation_id,
        name,
        phone_number,
        time_consultation,
        status
      FROM
        consultations c
      WHERE state = true
      ORDER BY id;
    `;

    const result = await database.query(sql);
    return result.rows || [];
  }

  static async updateConsultation(params) {
    const sql = `
      UPDATE
        consultations c
      SET
        status =
        CASE
          WHEN c.status THEN false
          ELSE true
        END
      WHERE id = $1
      RETURNING *;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteConsultation(params) {
    const sql = `
      UPDATE
        consultations
      SET
        state = false
      WHERE id = $1
      RETURNING id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Consultation;