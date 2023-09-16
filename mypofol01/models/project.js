const pool = require("./dbcp");
const toUnnamed = require('named-placeholders')();

module.exports = {
  findByAccountId: async (accountId) => {
    const sql = `
            select id,
                   name,
                   role,
                   description,
                   image_project,
                   from_date as fromDate,
                   if(to_date is null, '' , to_date) as toDate
              from project
             where account_id=?
        `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, [accountId]);
    conn.release();

    return result;
  },

  insert: async (project) => {
    const sql = toUnnamed(`
      insert
        into project 
      values (null, :name, :role, :description, null, :fromDate, :toDate, now(), now(), :accountId)
    `, project);

    const conn = await pool.getConnection();
    const [result] = await conn.query(...sql);
    conn.release();

    return result;
  },

  update: async (project) => {
    const sql = toUnnamed(`
      update project 
         set name = :name,role = :role, description = :description, from_date= :fromDate, to_date = :toDate
       where id = :id
         and account_id = :accountId
    `, project);

    const conn = await pool.getConnection();
    const [result] = await conn.query(...sql);
    conn.release();

    return result;
  },
  
  delete : async (id, accountId) => {
    const sql = `
      delete
        from project 
       where id = ?
         and account_id = ?
    `;

    const conn = await pool.getConnection();
    const [result] = await conn.query(sql,[id, accountId]);
    conn.release();

    return result;
  }
};
