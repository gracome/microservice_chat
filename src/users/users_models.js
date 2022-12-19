const sequelize= require('../db/sequelize')
const bcrypt = require('bcrypt')
const _= require('lodash');
const { bind } = require('lodash');
const User = sequelize.models.users;
const jwt = require('jsonwebtoken')



module.exports.create = async (data) => {
    try {
        let hashedPassword = await this.hashPassword(data.password);


         let records = await sequelize.query(`INSERT INTO utilisateurs (username, role,password) VALUES ($1,$2,$3)`,
            {
                bind: [data.username,data.role, hashedPassword],
            }
        );

        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.delete = async (data) => {
    try {

        var records = await sequelize.query(`DELETE FROM utilisateurs  WHERE username= $1 `,
            {
                bind: [data.username]
            }

        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.update = async (data) => {
    try {

        var records = await sequelize.query(`UPDATE utilisateurs SET username = $1 WHERE username= $2 `,
            {
                bind: [data.username, data.username]
            }

        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.findAll = async (data) => {
    try {

        var records = await sequelize.query(`SELECT * FROM utilisateurs `,

        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.findByPk = async (data) => {
    try {
        var records = await sequelize.query(`SELECT * FROM utilisateurs WHERE id = $1 `,
            {
                bind: [data.id]
            }
        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getProfile = async (data) => {
    try {
        var records = await sequelize.query(`SELECT * FROM utilisateurs WHERE id = $1 `,
        {
            bind: [data.id]
        }
    );
            return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getProfileFromObject = async (user) => {
    try {
        var profile = _.omit(user, ['password']);
        return profile;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.findByLogin = async (data) => {
    try {
        let record = await sequelize.query(`SELECT * FROM utilisateurs where username= $1`,
           {
            bind:[data.username] 
           } )
           
        return record;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.validatePassword = async (plainPassword, hashedPassword) => {
    console.log(hashedPassword, "ugiugiu");
    return await bcrypt.compare(plainPassword, hashedPassword);
}
module.exports.hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
}
module.exports.login = async (data) => {
    try {
        const { login, password } = data;
        const user = await this.findByLogin(data);
        if (!user) return { message: 'information de connection incorrect' };
        const passwordIsValid = await this.validatePassword(password, user[0][0].password);
        if (!passwordIsValid) return { message: 'Information de connection incorrect' }
        const accessToken = jwt.sign(
            { userId: user.id, role: user.role },
            require('../auth/private_keys'),
            {
                expiresIn: "1d"

            }
        );

        return {
            accessToken: accessToken,
            expiresIn: 86400,
        }
    } catch (error) {
        console.error(error);
        throw error;

    }

}

module.exports.changePassword = async (data) => {
    
    let {id,oldPassword,newPass} = data
    try {

        let [currentPassword] = await sequelize.query(`SELECT password FROM utilisateurs WHERE id= $1 `,
            {
                bind: [ id]
            }

        );

        currentPassword = currentPassword[0].password
        let samePassword = await bcrypt.compare(oldPassword, currentPassword)
       
        if (samePassword == true) {
            let hashedPassword = await this.hashPassword(newPass);
             await sequelize.query('UPDATE utilisateurs SET password= $1 WHERE id= $2 ',
                {
                    bind: [hashedPassword, data.id]
                }
            );
            return 'Le mot de passe a bien été modifier'
        } else {
            return 'Ancien mot de passe incorrect'
        }
     }catch (error) {
        console.error(error);
        throw error;
    }
}
