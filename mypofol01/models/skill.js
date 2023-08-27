const pool = require('./dbcp');

module.exports = {
  findByUserId: async (userId) => {
    const conn = await pool.getConnection();

    const sql = `
        select a.id, a.name, a.level, a.duration, b.name as skillSet
          from skill a, skillset b
        where a.skillset_id=b.id
          and b.user_id=?
    `;
    const [result] = await conn.query(sql, [userId]);
    conn.release();

    return result;
  }
}