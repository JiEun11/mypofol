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

    createUserInfo: async (account, email, password) => {
      const conn = await pool.getConnection();
      const sql = `INSERT INTO USER (account, email, password, name, title, created_at, last_updated_at) VALUES(?,?,?,?,?,?,?)`;
      const [result] = await conn.query(sql, [account, email, password, account, 'init title', new Date(), new Date()]);
      conn.release();
  
      return result;
    }
};