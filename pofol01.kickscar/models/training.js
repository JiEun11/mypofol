const pool = require('./dbcp');

module.exports = {
    findByUserId: async (userId) => {
        const conn = await pool.getConnection();

        const sql = `
              select id, type, title, date_format(awarded, "%Y-%m") as awarded, ifnull(description, "") as description
                from training
               where user_id=?
            order by type asc, awarded desc
        `;
        const [result] = await conn.query(sql, [userId]);        
        conn.release();
            
        return result;
    }
};