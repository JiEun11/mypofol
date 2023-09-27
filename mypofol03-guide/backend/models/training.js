const pool = require('./dbcp');
const toUnnamed = require('named-placeholders')();

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
      select id, 
            type,
            title, 
            awarded,
            ifnull(description, '') as description
      from training
            where account_id=?
            order by awarded desc
    `;
    
    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result;
  },
}