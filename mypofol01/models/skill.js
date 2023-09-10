const pool = require('./dbcp');

module.exports = {
  // 20230910 #9
  findByAccountId: async (accountId) => {
    const sql = `
        select a.id, a.name, a.level, a.duration, b.name as skillSet
          from skill a, skillset b
        where a.skillset_id = b.id
          and b.account_id = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result;
  }
}