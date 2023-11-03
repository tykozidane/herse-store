const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { send_response } = require("../component/response");
//i_user, n_username, role
module.exports = {
    auth_token: async (req, res, next) => {
      let authorization = req.headers['authorization'];
      if(!authorization) return  send_response({res: res, status: "201"});
      try {
          let token = authorization.split(" ");
          const decoded = jwt.verify(token[1], process.env.TOKEN_KEY);
            req.user = decoded;
            next();
          } catch (err) {
            return send_response({res: res, status: "202", data: err.message});
          }
    },
    auth_admin: async (req, res, next) => {
      let authorization = req.headers['authorization'];
        if(!authorization) return  send_response({res: res, status: "201"});
        try {
            let token = authorization.split(" ");
            const decoded = jwt.verify(token[1], process.env.TOKEN_KEY);
            if(decoded.role != "admin") return send_response({res: res, status: "203"});
            req.user = decoded; 
            next();
          } catch (err) {
            return send_response({res: res, status: "202", data: err.message});
          }
    },
    auth_role: async (req, res, next) => {
        let authorization = req.headers['authorization'];
        let { i_store } = req.body || "";
        if(!authorization) return  send_response({res: res, status: "201"});
        try {
            let store = await db.select('i_user').from("account.t_d_store").where("i_store", i_store);
            if (!store.i_user) return send_response({res: res, status: "108"});
            let token = authorization.split(" ");
            const decoded = jwt.verify(token[1], process.env.TOKEN_KEY);
            if(decoded.i_user != store.i_user || decoded.role != "admin") return send_response({res: res, status: "203"});
            req.user = decoded; 
            next();
          } catch (err) {
            return send_response({res: res, status: "202", data: err.message});
          }
    },
}