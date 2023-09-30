const pool = require('./dbcp');
const toUnnamed = require('named-placeholders')();

module.exports = {
  findByName: async (name) => {
    const sql = `
      select a.id, a.name, a.status, b.name as profileName, b.image as profileImage
        from account a, profile b
       where a.id = b.account_id
         and a.name = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [name]);
    conn.release();

    return result[0];
  },

  findByEmailAndPassword: async (email, password) => {
    const sql = `
      select a.id, a.name, b.name as profileName, b.image as profileImage
        from account a, profile b
       where a.id = b.account_id
         and a.email = ?
         and a.password = password(?)
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [email, password]);
    conn.release();

    return result[0];
  },

  insert: async (account) => {
    const sql = toUnnamed(`
      insert
        into account(name, email, password, created_at, last_updated_at)
      values (:name, :email, password(:password), now(), now())
    `, account);

    const conn = await pool.getConnection();
    const [result] = await conn.query(...sql);
    conn.release();

    return result.insertId;
  }

};