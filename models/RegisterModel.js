const pool = require('../config/database');

class Register{

    constructor(username, password, email){
        this.username = username;
        this.password = password;
        this.email = email;
    }

    save(){
       //save user to database
       var sql = `
        INSERT INTO users(
            username,
            password,
            email
        )
        VALUES (
            ?, ?, ?
        );
       `;
       
       return new Promise((resolve, reject) => {
           if(this.username != null && this.username != ''){
            pool.query(sql, [this.username, this.password, this.email],function (err, result) {
                if(err) resolve(false);
                else {
                    resolve(true);
                }
            })
           }
    });
    }
}

module.exports = Register;