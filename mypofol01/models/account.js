const pool = require('./dbcp');

module.exports = {
    findByAccount: async (account) => {
        const conn = await pool.getConnection();
        const sql = 'select a.id, a.name as accountName, p.image as profileImage, a.status from account a, profile p where a.id = p.account_id and a.name=?';
        const [result] = await conn.query(sql, [account]);        
        conn.release();
            
        return result[0];
    },

    findByEmailPassword: async (email, password) => {
      /*
        세션에 저장 할 것이기 때문에 너무 많은 데이터를 가져오지 않도록!
        공통 UI인 header, side sliding pannel에 세팅할 정도의 데이터만 가져오면 됨.
        signup 에서 비밀번호를 암호화해서 넣기 때문에 여기서도 비밀번호 파라미터를 암호화! 
      */
      const conn = await pool.getConnection();
      
      const sql = 'select a.id, a.name as accountName, p.name profileName, p.image as profileImage from account a, profile p where a.id = p.account_id and a.email=? and a.password=password(?)';
      const [result] = await conn.query(sql, [email, password]);

      conn.release();
      
      return result[0];
    },
    insert: async (account, email, password) => {
      /*
        1.  insert query의 반환값 확인 해 볼 것 
            특히 반환되는 row 수, insert 된 row의 id(PK) 는 나중에 유용하게 사용할 수 있음!
        2.  account, email, password, image_profile 만 들어가면 됨. 나머진 /dashboard/profile 에 입력하면 됨: Not Null 때문에 DB Schema 변경 했음
        3.  new Date() 보다는 mysql now() 함수를 자체적으로 써주는 게 좋음
        4.  password는 mysql 경우에는 password() 함수로 간단히 암호화!
      */

      const conn = await pool.getConnection();
      
      const sqlToAccount = `insert into account(name, email, password, created_at, last_updated_at) values(?, ?, password(?), now(), now())`;
      await conn.query(sql, [account, email, password]);

      const sqlToProfile= `insert into profile(image, created_at, last_updated_at) values('/images/default_profile.jpg', now(), now())`;
      await conn.query(sql);
      conn.release();
    }
};