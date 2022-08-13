const { database } = require('./connection');

class Categories {

  static async getCategories() {
    const sql = `
      SELECT
        id category_id,
        name_ru,
        name_uz
      FROM
        categories c
      WHERE state = true;
    `;

    const result = await database.query(sql);
    return result.rows || [];
  }

  static async getCategoryOne(params) {
    const sql = `
      SELECT
        id category_id,
        name_ru,
        name_uz
      FROM
        categories c
      WHERE state = true and id = $1;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async createCategory(params) {
    const sql = `
      INSERT INTO categories (name_ru, name_uz, created_by)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Categories;