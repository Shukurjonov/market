const { Pool } = require("pg");
const { DB } = require("../config");

class Database {

  query(query, params) {

    const pool = new Pool({ connectionString: DB.url });
    return new Promise((resolve, reject) =>
      pool.query(query, params, (err, res) => {
        pool.end();
        if (err) return reject(err);
        return resolve(res);
      })
    );
  }

}

module.exports = { database: new Database() };
