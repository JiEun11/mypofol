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
    },

    updateByDefault: async (accountId, profile) => {
      const conn = await pool.getConnection();
      const {name, email, description, phone, district, social_accounts} = profile;
      let params = [];
      params.push(name)
      params.push(email)
      params.push(description);
      params.push(phone);
      params.push(district);
      
      for(let i=0; i< social_accounts.link.length ; i++){
        console.log(social_accounts.link[i]);
        params.push(social_accounts.link[i]);
      }
      params.push(accountId);
      const sql = `
        update 
          profile set email=?, name=?, description=?, district=?, phone=?
          , link1=?, link2=?, link3=?, link4=?, link5=?, link6=?
          , last_updated_at = now()
        where account_id =?
      `;
      console.log("params >>>>" , params);
      await conn.query(sql, params);
      conn.release();
    }
};

