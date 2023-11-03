const { send_response } = require("../../component/response")
const { check_storename, insert_store } = require("../../services/Store/create-store")


module.exports = async (req, res) => {
    let {n_storename, i_user, n_description, n_address, i_store_type} = req.body || "";
    let {n_username } = req.user;
    try {
        //check Store Name that doesnt exist
        const checkStorename = await check_storename({storename: n_storename});
        var {status, data} = checkStorename;
        if(status != 0) throw checkStorename;
        if(data.length > 1) return send_response({res: res, status: "107"});

        //set data to insert 
        let dataInsert = {
            n_storename: n_storename,
            i_user: i_user,
            n_description: n_description,
            n_address: n_address,
            i_store_type: i_store_type,
            n_created_by: n_username,
            b_active: true
        }

        //Function to Insert
        const insertStore = await insert_store({data: dataInsert});
        var {status, data} = insertStore;
        if(status != 0) throw insertStore;

        // console.log(data);
        return send_response({res: res, status: "00", data: data});

    } catch (err) {
        return send_response({res: res, status: err.status || "9021", data: err.data || err.message});
    }
}