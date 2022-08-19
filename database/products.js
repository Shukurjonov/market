const { database } = require('./connection');

class Products {

  static async getProducts(params) {
    const sql = `
    SELECT 
      p.id,
      c.id category_id,
      c.name_ru category_name_uz,
      c.name_uz category_name_ru,
      CONCAT('https://', $1::VARCHAR, '/', p.image) AS image,
      price,
      sale_price,
      quantity,
      frame_ru,
      frame_uz,
      size,
      depth,
      equipment_ru,
      equipment_uz,
      ps.id status_id,
      ps.name_ru status_ru,
      ps.name_uz status_uz
    FROM
      products p
    JOIN
      categories c ON c.id = p.category_id
    JOIN 
      product_status ps ON ps.id = p.status_id  
    WHERE p.state = true
    ORDER BY p.id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async getProductFilterByCategory(params) {
    const sql = `
    SELECT 
      p.id,
      c.id category_id,
      c.name_ru category_name_ru,
      c.name_uz category_name_uz,
      CONCAT('https://', $1::VARCHAR, '/', p.image) AS image,
      price,
      sale_price,
      quantity,
      frame_ru,
      frame_uz,
      size,
      depth,
      equipment_ru,
      equipment_uz,
      ps.id status_id,
      ps.name_ru status_ru,
      ps.name_uz status_uz
    FROM
      products p
    JOIN
      categories c ON c.id = p.category_id
    JOIN 
      product_status ps ON ps.id = p.status_id  
    WHERE p.state = true and p.category_id = $2::INTEGER
    ORDER BY p.id;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async getProductOne(params) {
    const sql = `
    SELECT 
      p.id,
      c.id category_id,
      c.name_ru category_name_uz,
      c.name_uz category_name_ru,
      CONCAT('https://', $1::VARCHAR, '/', p.image) AS image,
      price,
      sale_price,
      quantity,
      frame_ru,
      frame_uz,
      size,
      depth,
      equipment_ru,
      equipment_uz,
      ps.id status_id,
      ps.name_ru status_ru,
      ps.name_uz status_uz
    FROM
      products p
    JOIN
      categories c ON c.id = p.category_id
    JOIN 
      product_status ps ON ps.id = p.status_id 
        WHERE p.id = $2 AND p.state = true
    ORDER BY p.id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async getProductStatus() {
    const sql = `
      SELECT 
        id,
        name_ru,
        name_uz 
      FROM 
        product_status;
    `;

    const result = await database.query(sql);
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
        category_id = coalesce($1, category_id),
        image = coalesce($2, image),
        price = coalesce($3, price),
        sale_price = coalesce($4, sale_price),
        quantity = coalesce($5, quantity),
        frame_ru = coalesce($6, frame_ru),
        frame_uz = coalesce($7, frame_uz),
        size = coalesce($8, size),
        depth = coalesce($9, depth),
        equipment_ru = coalesce($10, equipment_ru),
        equipment_uz = coalesce($11, equipment_uz),
        status_id = coalesce($12, status_id)
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