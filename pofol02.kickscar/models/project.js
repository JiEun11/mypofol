const pool = require('./dbcp');

module.exports = {
    findByUserId: async (userId) => {
        const conn = await pool.getConnection();

        const sql = `
            select a.name,
                   a.role,
                   a.description,
                   a.image_project,
                   date_format(from_date, "%Y-%m") as fromDate,
                   if(to_date is null, "현재", date_format(to_date, "%Y-%m")) as toDate,
                   b.name as categoryName
              from project a,
                   project_category b
             where a.project_category_id=b.id
               and a.user_id=?;
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