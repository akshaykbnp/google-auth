
export const getJWTSecretKey = () => {
    return process.env.JWT_SECRET;
}

export const getHashSalt =  () => {
    return process.env.HASH_SALT;
}