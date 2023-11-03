const { send_response } = require("./response");


module.exports = {
    valid_username: async (username) => {
        var validFormat = /^[a-zA-Z]+$/;
        var noat=/^(?=.*[@])/;
        if(username.length > 5 && username.match(validFormat) && !noat.test(username)){
            return true;
        } else {
            return false
        }
    },
    valid_email: async (email) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.match(validRegex)){
            return true;
        } else {
            return false
        }
    },
    valid_password: async (password) => {
        var pwd=/^(?=.*[a-z])/;
        var pwd1=/^(?=.*[A-Z])/;
        var pwd2=/^(?=.*[0-9])/;
        var pwd3=/^(?=.*[.!#$%&'*+/=?^_`{|}~-])/;
        var noat=/^(?=.*[@])/;
        if(password.length > 7 && pwd.test(password) && pwd1.test(password) && pwd2.test(password) && pwd3.test(password) && !noat.test(password)){
            return true;
        } else {
            return false
        }
    },
}