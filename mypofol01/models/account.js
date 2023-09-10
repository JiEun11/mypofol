const pool = require('./dbcp');

module.exports = {

    // 많은 개발자가 이름 짓는데 상당한 시간을 쓴다.
    // 함수 이름, 파라미터 이름 하나 하나 꼼꼼히 신중히 짓는다 말이지 니 이름 지을라고 아버지가 얼마나 고민 하셨겠냐?
    // 테이블 별칭은 a, b, c, 이런식으로 나가도 되고
    // 이 쿼리 결과가 account의 row인데 굳이 accountName으로 별칭 할 필요는 없어 보인다.
    // 파라미터로 넘어 오는 애는 이제 account name 이다.
    // 
    // 아래 쿼리 참고.

    // 20230910 #1    
    // findByAccount: async (account) => {
    //     const conn = await pool.getConnection();
    //     const sql = 'select a.id, a.name as accountName, p.image as profileImage, a.status from account a, profile p where a.id = p.account_id and a.name=?';
    //     const [result] = await conn.query(sql, [account]);        
    //     conn.release();
            
    //     return result[0];
    // },
    findByName: async (name) => {
      const sql = `
        select a.id, a.name, a.status, b.name as profileName, b.image as profileImage
          from account a, profile b
         where a.id = b.account_id
           and a.name = ?
      `;

      const conn = await pool.getConnection();
      const [result] = await conn.query(sql, [name]);        
      conn.release();
          
      return result[0];
    },

    // 마찬가지~~
    // 함수 이름도 바꿈
    // 수정 쿼리 참고
    //

    // 20230910 #2
    // findByEmailPassword: async (email, password) => {
    //   /*
    //     세션에 저장 할 것이기 때문에 너무 많은 데이터를 가져오지 않도록!
    //     공통 UI인 header, side sliding pannel에 세팅할 정도의 데이터만 가져오면 됨.
    //     signup 에서 비밀번호를 암호화해서 넣기 때문에 여기서도 비밀번호 파라미터를 암호화! 
    //   */
    //   const conn = await pool.getConnection();      
    //   const sql = 'select a.id, a.name as accountName, p.name profileName, p.image as profileImage from account a, profile p where a.id = p.account_id and a.email=? and a.password=password(?)';
    //   const [result] = await conn.query(sql, [email, password]);
    //   conn.release();      
    //   return result[0];
    // },
    
    findByEmailAndPassword: async (email, password) => {
      const sql = `
        select a.id, a.name, b.name as profileName, b.image as profileImage
          from account a, profile b
         where a.id = b.account_id
           and a.email = ?
           and a.password = password(?)
      `;

      const conn = await pool.getConnection();
      const [result] = await conn.query(sql, [email, password]);
      conn.release();
      
      return result[0];
    },    

    // 음,,,,
    // 자바에 dao 기억나?
    // 보통, 하나의 테이블에 CRUD!!
    // Account Model insert(C) 에서 왜?? profile 테이블 insert 까지 하는데?
    // 
    // 니 코드가 고민(생각)이 없다고 하는 이유가 이런 거다.
    // 이 고민을 하지 않으면 코딩을 많이 해야 하는거고 많이 했는데도 이런 고민을 모하면 개발하지 말아야 해. 재능이 없는거여~ 연습을 했은데도 이런 생각을 못하면 개발자 하지 말아야 해
    //
    // 반환값을 확인해 보라고 주석까지 며칠 전에 달아줬는데... 음...ㅜ_-.. 반성하고 고민하면서 코딩 더 해야 해 너!
    //
    // 몰랐다면 잘바라 어떻게 하는 게 맞는지!! 중요하다.
    //

    // 20230910 #3
    // insert: async (account, email, password) => {
      /*
        1.  insert query의 반환값 확인 해 볼 것 
            특히 반환되는 row 수, insert 된 row의 id(PK) 는 나중에 유용하게 사용할 수 있음!
        2.  account, email, password, image_profile 만 들어가면 됨. 나머진 /dashboard/profile 에 입력하면 됨: Not Null 때문에 DB Schema 변경 했음
        3.  new Date() 보다는 mysql now() 함수를 자체적으로 써주는 게 좋음
        4.  password는 mysql 경우에는 password() 함수로 간단히 암호화!
      */
    //   const conn = await pool.getConnection();
    //   const sqlToAccount = `insert into account(name, email, password, created_at, last_updated_at) values(?, ?, password(?), now(), now())`;
    //   await conn.query(sql, [account, email, password]);

    // 이러면 account랑 어떻게 연결 하냐?
    // 이건 RDBMS 기본도 안 되어 있는 거여!!
    // 개발자라 할 수 없을 정도로 참담한 수준이여~ 그냥 일반인 수준인 거야! ㅜㅜ
    // 
    //  const sqlToProfile= `insert into profile(image, created_at, last_updated_at) values('/images/default_profile.jpg', now(), now())`;
    //  await conn.query(sql);
    //  conn.release();
    // }
    insert: async (name, email, password) => {
      const sql = `
        insert
          into account(name, email, password, created_at, last_updated_at)
        values (?, ?, password(?), now(), now())
      `;

      const conn = await pool.getConnection();      
      const [result] = await conn.query(sql, [name, email, password]);
      conn.release();

      //
      // 이 번엔 꼭!!!! insert 쿼리 반환 객체를 console에 찍어서 확인 해바라
      //
      // insert 된 row의 id(PK)를 반환 해주고
      // 이 것을 Profile Model 의 insert에서 사용해 insert 해야한다. (models/account.js 추가 했음)
      // controllers/sign 의 join() 함수 참고 해
      // 
      return result.insertId;
    }    
    
};