const pool = require('./dbcp');
const toUnnamed = require('named-placeholders')();

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
      select id, name, email, description, district, phone, image, link1, link2, link3, link4, link5, link6
        from profile
       where account_id = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result[0];
  },

  insertByDefault: async (accountId) => {
    const sql = `
      insert
        into profile(image, created_at, last_updated_at, account_id)
      values ('/images/default-user.jpg', now(), now(), ?)
    `;

    const conn = await pool.getConnection();
    await conn.query(sql, [accountId]);
    conn.release();
  },

  /*
  update가 좋지 않을까?
  insertByDefault는... 디폴트 값으로 인서트한다.... 머 이런 뜻? 그래서 함수 파라미터가 별게 없고... 
  이 update는 파라미터 profile 내용으로 업데이트 하니깐... 그냥 update가 좋을 것 같단?
  너무 이름가지고 내가 머라 머라 해서 니가 자유롭게 코딩 하는 데 문제 있을까 걱정되긴 하지만,,,,
  지금 처럼 맘대로 막 지어바 그럼 막 내 의견도 전달해 줄깨
  납득이 가면 수정하고 납득이 안 가면 냅둬~~ 니가 짜는 거니깐. 
  */
  updateByDefault: async (profile) => {
    /*
    const conn = await pool.getConnection();

    const {name, email, description, phone, district, social_accounts} = profile;
    let params = [];
    // name, email 순서 에러~
    params.push(name)
    params.push(email)
    params.push(description);
    params.push(phone);
    params.push(district);
    
    // 
    // social_accounts? 깃허브 소스 뻬겨오다 보니...... 쏘뤼~
    // 그냥 link1, link2, link3, .... 가져오는 게 편할 듯??? ejs 수정 했음
    // 니 생각에 이상하거나 이해가 안되면 일단 편한대로 눈치보지 말고 막 고치고 돌아가게 구현!
    // 그리고 지금 처럼 더 좋은? 내가 나름 개안은 방법이다 싶은거 제안 해줄깨~~~
    // 
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
    */

    //
    // 20230911 #2 (for using named-placeholders)
    //
    // 참고
    // https://github.com/mysqljs/named-placeholders
    //
    // 설치
    // npm i named-placeholders
    //
    const sql = toUnnamed(`
      update profile
         set name = :name,
             email = :email,
             description = :description,
             district = :district,
             phone = :phone,
             link1 = :link1,
             link2 = :link2,
             link3 = :link3,
             link4 = :link4,
             link5 = :link5,
             link6 = :link6,
             last_updated_at = now()
       where account_id = :accountId
    `, profile);

    const conn = await pool.getConnection();
    // 배열 분해 써보자~
    // await conn.query(sql[0], sql[1]);
    await conn.query(...sql);
    conn.release();
  }
};

