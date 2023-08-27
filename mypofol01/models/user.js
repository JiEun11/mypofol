const pool = require('./dbcp');

module.exports = {
    findByAccount: async (account) => {
        const conn = await pool.getConnection();

        const [result] = await conn.query('select id, account, email, name, title, description, image_profile as imageProfile from user where account=?', [account]);        
        conn.release();
            
        return result[0];
    }
};