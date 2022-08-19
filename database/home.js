const { database } = require('./connection');

class Home {
  static async getCategories() {
    const sql = `
      SELECT 
        id,
        name_ru,
        name_uz
      FROM
        categories c
      WHERE
        c.state = true
      ORDER BY c.id;
      `;

    const result = await database.query(sql);
    return result.rows || [];
  }

  static async getProducts(params) {
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
      WHERE p.state = true
      order by p.id;
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
      c.name_ru category_name_ru,
      c.name_uz category_name_uz,
      CONCAT('https://', $1::VARCHAR , '/', p.image) AS image,
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
    WHERE p.state = true and p.id = $2::INTEGER
    ORDER BY p.id;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

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

  static async createOrder(params) {
    const sql = `
      INSERT INTO orders (
        product_id,
        name,
        phone_number,
        address,
        location ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id as order_id, product_id, name, phone_number;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async createConsultation(params) {
    const sql = `
      INSERT INTO consultations (
        name,
        phone_number ) VALUES ($1, $2)
      RETURNING id as consultation_id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }


}

module.exports = Home;