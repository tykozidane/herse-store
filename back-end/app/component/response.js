const db = require('../config/database');
const get_message = async ({code}) => {
    try {
        let message = await db.raw(`
        SELECT 
            n_message
        FROM
            operation.t_d_code_message
        WHERE
            c_message = '${code}'
            and b_active = true
        `)
        if (message.rowCount <= 0) return { status: 1, data: "PESAN [RESPONSE] BELUM TERDAFTAR" };
    return {status: 0, message: message.rows[0].n_message}
    } catch (err) {
        return { status: 9999, data: err.message};
    }
}
module.exports = {
    send_response: async ({res, status, message, data }) => {
        let msg = await get_message({code: status});
            return res.status(200).send({
                status: status.toString(),
                message: msg.message || message || "GANGGUAN PADA SISTEM, SILAHKAN PERIKSA KEMBALI",
                data: data || {},
            })
        
    }
}