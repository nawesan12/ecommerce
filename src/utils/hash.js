import bcrypt from "bcrypt"

/** 
*    encryptPassword
*    Sirve para encriptar la contraseña al momento de subirla a la base de datos
*    Es asincrona, asique no seas bobo y metele un await antes
*
*    @param {string} password
*    @returns {string} password encriptado
*/

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash 
}