const pool = require('./dbcp');
const toUnnamed = require('named-placeholders')();

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
      select id, name, birth, email, description, district, phone, image, blog, link1, link2, link3, link4, link5 
        from profile
       where account_id = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result[0];
  },

  insertByDefault: async (accountId) => {
    const sql = `
      insert
        into profile(image, created_at, last_updated_at, account_id)
      values ('/images/default-user.jpg', now(), now(), ?)
    `;

    const conn = await pool.getConnection();
    await conn.query(sql, [accountId]);
    conn.release();
  },

  update: async (profile) => {
    const sql = toUnnamed(`
      update profile
         set name = :name,
             birth = :birth,
             email = :email,
             description = :description,
             district = :district,
             phone = :phone,
             blog = :blog,
             link1 = :link1,
             link2 = :link2,
             link3 = :link3,
             link4 = :link4,
             link5 = :link5,
             last_updated_at = now()
       where account_id = :accountId
    `, profile);

    const conn = await pool.getConnection();
    await conn.query(...sql);
    conn.release();
  }
};

