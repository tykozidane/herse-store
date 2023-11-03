const db = require('../../config/database');

module.exports = {
    check_store: async (i_store) => {
        try {
            let result = await db.select('*').from('account.t_d_storekh')
        } catch (err) {
            return {status: 2011, data: err.message};

        }
    }
}