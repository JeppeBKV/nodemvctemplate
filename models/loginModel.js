const pool = require('../dbconn');

class Login{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    async verify(){
        var sql = `SELECT * FROM users WHERE username = ? AND password = ?;
       `;
        let response = false;


        return new Promise((resolve, reject) => {
            pool.query(sql, [this.username, this.password], function (err, result) {
                if(err) resolve(false);
                else {
                    //console.log(result);
                    if(result.length == 0){
                        console.log("Do not log in");
                        resolve(false);
                    } else {
                        console.log("Log in")
                        resolve(true);
                    }
                }
            })
        });
    }
}

module.exports = Login;