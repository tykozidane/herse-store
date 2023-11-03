const db =require('../../config/database');

module.exports = {
    check_storename: async ({storename}) => {
        try {
            let result = await db.select("*").from("account.t_d_store").where("n_storename", storename);
            return {status: 0, data: result};
        } catch (err) {
            return {status: 2001, data: err.message};
        }
    },
    insert_store: async ({data}) => {
        try {
            let insert = await db("account.t_d_store").insert(data).returning("*");
            return {status: 0, data: insert}
        } catch (err) {
            return {status: 2002, data: err.message};
        }
    },
}