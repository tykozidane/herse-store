const { now } = require("moment");
const { send_response } = require("../../component/response");


module.exports = async (req, res) => {
    let {n_storename, n_description, n_address, i_store_type, b_active, i_user} = req.body || "";
    if(!req.user) return send_response({res: res, status: "204"});
    try {
        var dataUpdate = {
            n_storename: n_storename,
            n_description: n_description,
            n_address: n_address,
            i_store_type: i_store_type,
            b_active: b_active,
            n_update_by: req.user.n_username,
            d_update_at: now()
        };
        
        
    } catch (err) {
        return send_response({res: res, status: err.status || "9022", data: err.data || err.message});
    }
}