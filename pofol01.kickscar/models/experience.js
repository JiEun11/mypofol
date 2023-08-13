const pool = require('./dbcp');

module.exports = {
    findByUserId: async (userId) => {
        const conn = await pool.getConnection();

        const sql = `
              select id, title, company, description, date_format(from_date, "%Y-%m") as fromDate, if(to_date is null, "재직중", date_format(to_date, "%Y-%m")) as toDate, image_logo as imageLogo
                from experience
               where user_id=?
            order by from_date desc
        `;
        const [result] = await conn.query(sql, [userId]);        
        conn.release();
            
        return result;
    }
};