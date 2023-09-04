const pool = require('./dbcp');

module.exports = {
    findByAccount: async (account) => {
        const conn = await pool.getConnection();
        const sql = 'select id, account, email, name, title, description, image_profile as imageProfile from user where account=?';
        const [result] = await conn.query(sql, [account]);        
        conn.release();
            
        return result[0];
    },

    findByEmailPassword: async (email, password) => {
      const conn = await pool.getConnection();
      const sql = 'select id, account, email, name, title, description, image_profile as imageProfile from user where email=? and password=?';
      const [result] = await conn.query(sql, [email, password]);        
      conn.release();
      return result[0];
    },
    insert: async (account, email, password) => {
      const conn = await pool.getConnection();
      
      const sql = `insert into user(account, email, password, image_profile, created_at, last_updated_at) values(?, ?, password(?), '/images/default-user.jpg', now(), now())`;
      const result = await conn.query(sql, [account, email, password]);
      
      conn.release();
  
      return result;
    }
};