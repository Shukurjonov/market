const { database } = require('./connection');

class Order {
  static async getOrders(params) {
    const sql = `
      SELECT
        o.id order_id,
        name,
        phone_number,
        p.id product_id,
        CONCAT('https://', $1::VARCHAR, '/', p.image) AS image,
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
      RETURNING id, status;
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
