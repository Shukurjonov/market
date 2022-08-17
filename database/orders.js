const { database } = require('./connection');

class Order {
  static async getOrders(params) {
    const sql = `
      SELECT
        o.id order_id,
        name,
        phone_number,
        p.id product_id,
        CONCAT('http://', $1::VARCHAR, '/', p.image) AS image,
        p.size,
        p.depth,
        coalesce(p.sale_price, p.price) price,
        address,
        time_order,
        status
      FROM orders o
      LEFT JOIN products p ON o.product_id = p.id
      WHERE o.state = true
      ORDER BY o.id;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateOrder(params) {
    const sql = `
      UPDATE orders
      SET status = CASE WHEN status THEN false ELSE true END
      WHERE id = $1
      RETURNING id, status, product_id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateProduct(params) {
    const sql = `
      UPDATE products
      SET
        quantity = CASE WHEN $1::boolean THEN quantity - 1 ELSE quantity + 1 END,
        status_id = 
            CASE 
              WHEN $1::boolean THEN  
                  CASE WHEN quantity = 1 THEN 3 ELSE COALESCE(status_id, 1) END
              ELSE 1 
            END
      WHERE id = $2::int
      RETURNING id, quantity;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteOrder(params) {
    const sql = `
      UPDATE
        orders
      SET
        state = false
      WHERE id = $1
      RETURNING id;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }
}

module.exports = Order;
