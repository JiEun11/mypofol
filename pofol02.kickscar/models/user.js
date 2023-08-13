const pool = require('./dbcp');

module.exports = {
    findById: async (id) => {
        const conn = await pool.getConnection();

        const [result] = await conn.query('elect account, email, name from user where id=?', [id]);        
        conn.release();
            
        return result[0];
    },
    findByAccount: async (account) => {
        const conn = await pool.getConnection();

        const [result] = await conn.query('select id, account, email, name, title, description, image_profile as imageProfile from user where account=?', [account]);        
        conn.release();
            
        return result[0];
    }
};