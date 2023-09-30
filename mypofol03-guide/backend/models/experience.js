const pool = require("./dbcp");

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
      select id,
             title,
             company,
             description,
             from_date as fromDate,
             if(to_date is null, '' , to_date) as toDate,
             image_logo as imageLogo
        from experience
       where account_id = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result;
  },
}
