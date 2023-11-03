const db = require("../../config/database");

module.exports = {
    get_user: async ({username, email}) => {
        try {
            let result = await db.raw(`
            Select
                *
            From
                account.t_d_user
            where
                n_username = '${username}'
                or n_email = '${email}'
            `)
            return {status: 0, data: result.rows}
        } catch(err) {
            return {status: 1011, data: err.message}
        }
    }
}