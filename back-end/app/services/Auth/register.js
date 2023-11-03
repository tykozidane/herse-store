const db = require("../../config/database");

module.exports = {
  check_account: async ({ username, email }) => {
    try {
      let result = await db.raw(`
            Select 
                * 
            from 
                account.t_d_user 
            where 
                n_username = '${username}' 
                or n_email = '${email}'
            `);console.log(result.rows);
      return { status: 0, data: result.rows };
    } catch (err) {
      return { status: 1001, data: err.message };
    }
  },
  insert_user: async ({ username, password, email }) => {
    try {
      let result = await db
        .insert({ n_username: username, e_password: password, n_email: email })
        .into("account.t_d_user").returning('*');
    return {status: 0, data: result};
    } catch (err) {
      return { status: 1002, data: err.message };
    }
  },
};
