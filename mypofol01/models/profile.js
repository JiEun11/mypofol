const pool = require('./dbcp');

module.exports = {
    findByAccountId: async (accountId) => {
        const conn = await pool.getConnection();
        const sql = `
          select id, name, email, description, district, phone, image, link1, link2, link3, link4, link5, link6
            from profile
           where account_id = ?
        `;
        const [result] = await conn.query(sql, [accountId]);        
        conn.release();
            
        return result[0];
    },
    
    insertByDefault: async (accountId) => {
      const conn = await pool.getConnection();
      
      const sql = `
        insert
          into profile(image, created_at, last_updated_at, account_id)
        values ('/images/default-user.jpg', now(), now(), ?)
      `;
      await conn.query(sql, [accountId]);

      conn.release();
    }
};

