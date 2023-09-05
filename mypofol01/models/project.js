const pool = require('./dbcp');

module.exports = {
    findByUserId: async (userId) => {
        const conn = await pool.getConnection();

        /**
         * 
         * portfolio_v3 가 mypofol 로 바꼈음
         * 자세한 정보는 mypofol/data-schema-mypofol 에 readme.md 확인
         * 참고로, project_category는 없앴음.
         * 
         * 이전 너가 만든 포폴은 저게 필요했는데, 새포폴에서는 필요 없어 없앴음!
         * pofol01.kickscar
         * pofol02.kickscar
         * 가 실행에 문제가 없어야 하기 때문에 mypofol 데이터베이스를 새로 만들었음. 참고!
         * 
         */
        const sql = `
            select a.name,
                   a.role,
                   a.description,
                   a.image_project,
                   date_format(from_date, "%Y-%m") as fromDate,
                   if(to_date is null, "현재", date_format(to_date, "%Y-%m")) as toDate
              from project a
             where a.user_id=?;
        `;
        const [result] = await conn.query(sql, [userId]);        
        conn.release();
            
        return result;
    },    
    findCategoryByUserId: async (userId) => {
        const conn = await pool.getConnection();

        const sql = `
            select c.id, c.name, d.projectCount
              from project_category c,
                   (select b.id, count(*) as projectCount
                      from project a, project_category b
                     where a.project_category_id = b.id
                       and a.user_id=? group by b.id) d
             where c.id = d.id;
        `;
        const [result] = await conn.query(sql, [userId]);        
        conn.release();
            
        return result;
    }
};