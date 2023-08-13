const pool = require('./dbcp');

module.exports = {
    findByUserId: async (userId) => {
        const conn = await pool.getConnection();

        const sql = `
              select id, title, date_format(from_date, "%Y-%m") as fromDate, if(to_date is null, "재학중", date_format(to_date, "%Y-%m")) as toDate, degrees, image_logo as imageLogo
                from education
               where user_id=?
            order by from_date desc
        `;
        const [result] = await conn.query(sql, [userId]);        
        conn.release();
            
        return result;
    }
};