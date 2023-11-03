const { send_response } = require("../../component/response");
const { valid_username, valid_email, valid_password } = require("../../component/validation");
const jwt = require("jsonwebtoken");
const { check_account, insert_user } = require("../../services/Auth/register");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    let { n_username, e_password, n_email, } = req.body || "";

    try {
        //Check Format Usrname
        var checkUsername = await valid_username(n_username);
        if(!checkUsername) throw {status: "102"};

        //Check Format Email
        var checkEmail = await valid_email(n_email);
        if(!checkEmail) throw {status: "103"};

        //Check Format Password
        var checkPassword = await valid_password(e_password);
        if(!checkPassword) throw {status: "104"};

        //Check username or email already exist
        const checkUser = await check_account({username: n_username, email: n_email});
        var {status, data} = checkUser;
        if(status != 0 ) throw checkUser;
        if(data.length > 0) return send_response({res: res, status: "101"});

        const hashPassword = await bcrypt.hash(e_password, 10);
        // console.log(hashPassword);

        //insert function
        const saveUser = await insert_user({username: n_username, password: hashPassword, email: n_email});
        var {status, data} = saveUser;console.log(data);
        if(status != 0) throw saveUser;
        const user = data[0];
        const token = jwt.sign(
            {
                i_user: user.i_user,
                n_username: user.n_username,
                role: user.role
            },
            process.env.TOKEN_KEY,
            { expiresIn: "24h", }
        );
        return send_response({res: res, status: "00", data: {i_user: user.i_user, n_username: user.n_username, token: token}});
    } catch (err) {
        return send_response({res: res, status: err.status || "9001", data: err.data || err.message})
    }
}