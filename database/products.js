const { database } = require('./connection');

class Products {

  static async getProducts(params) {
    const sql = `
      SELECT 
        p.id,
        c.name_ru,
        c.name_uz,
        CONCAT('http://', $1::VARCHAR, '/', p.image) AS image
      FROM
        products p
      JOIN
        categories c ON c.id = p.category_id
      WHERE p.state = true;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async getProductOne(params) {
    const sql = `
      SELECT 
        p.id,
        c.name_ru,
        c.name_uz,
        CONCAT('https://', $1::VARCHAR, '/', p.image) AS image
      FROM
        products p
      JOIN
        categories c ON c.id = p.category_id
      WHERE p.id = $2 AND p.state = true;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }


  static async createProduct(params) {
    const sql = `
      INSERT INTO products ( 
        category_id,
        image,
        price,
        sale_price,
        quantity,
        frame_ru,
        frame_uz,
        size,
        depth,
        equipment_ru,
        equipment_uz,
        status_id ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) 
      RETURNING 
        id,
        category_id,
        image,
        price;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateProduct(params) {
    const sql = `
      UPDATE products SET
        category_id = $1,
        image = $2,
        price = $3,
        sale_price = $4,
        quantity = $5,
        frame_ru = $6,
        frame_uz = $7,
        size = $8,
        depth = $9,
        equipment_ru = $10,
        equipment_uz = $11,
        status_id = $12
      WHERE id = $13
      RETURNING id, category_id, image, price;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteProduct(params) {
    const sql = `
      UPDATE products SET
        state = false
      WHERE id = $1
      RETURNING id;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }
}

module.exports = Products;