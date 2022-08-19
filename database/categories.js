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
      WHERE state = true
      ORDER BY id;
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

  static async updateCategory(params) {
    const sql = `
      UPDATE categories
      SET
        name_ru = coalesce($1, name_ru),
        name_uz = coalesce($2, name_uz),
        updated_at = coalesce($3, updated_at),
        updated_by = coalesce($4, updated_by)
      WHERE id = $5
      RETURNING id, name_ru, name_uz, updated_at;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteCategory(params) {
    const sql = `
      UPDATE categories
      SET 
        state = false,
        updated_at = coalesce($1, updated_at),
        updated_by = coalesce($2, updated_by)
      WHERE id = $3
      RETURNING id, name_ru, name_uz, updated_at;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteProduct(params) {
    const sql = `
      UPDATE products
      SET 
        state = false
      WHERE category_id = $1
      RETURNING id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async restoreCategory(params) {
    const sql = `
      UPDATE categories
      SET 
        state = true,
        updated_at = coalesce($1, updated_at),
        updated_by = coalesce($2, updated_by)
      WHERE id = $3
      RETURNING id, name_ru, name_uz, updated_at;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async restoreProduct(params) {
    const sql = `
      UPDATE products
      SET 
        state = true
      WHERE category_id = $1
      RETURNING id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }
}

module.exports = Categories;