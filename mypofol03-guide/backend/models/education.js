const pool = require('./dbcp');

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
        select id, 
               title, 
               from_date as fromDate,
               if(to_date is null, '' , to_date) as toDate,
               degrees,
               image_logo as imageLogo
          from education
         where account_id = ?
      order by from_date desc
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result;
  },
}