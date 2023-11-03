const { send_response } = require("../../component/response");
const { valid_username, valid_email, valid_password } = require("../../component/validation");
const bcrypt = require('bcrypt');
const { get_user } = require("../../services/Auth/login");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    let { n_username, e_password, } = req.body || "";
    try{
        var username = "";
        var email = "";

        //Check username or email
        var noat=/^(?=.*[@])/;
        if(noat.test(n_username)){
            email = n_username;
        } else {
            username = n_username;
        }

        //Get Data User
        let userData = await get_user({username: username, email: email});
        var {status, data} = userData;
        if(status != 0) throw userData;
        if(data.length < 1) throw {status: "105"}
        const user = data[0];
        //Validate Password
        const confirmPassword = bcrypt.compare(e_password, user.e_password);
        if(!confirmPassword) throw {status : "106"}

        const token = jwt.sign(
            {
                i_user: user.i_user,
                n_username: user.n_username,
                role: user.role
            },
            process.env.TOKEN_KEY,
            { expiresIn: "24h", }
        )
        return send_response({res: res, status: "00", data: {i_user: user.i_user, n_username: user.n_username, token: token}});

    } catch (err) {
        return send_response({res: res, status: err.status || "9002", data: err.data || err.message})
    }
}