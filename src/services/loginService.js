const { User } = require('../models');

const userDb = (email) => {
    const getUsers = User.findOne({ where: { email } });
    return getUsers;
};

const createUser = async (register) => {
    const user = await User.findOne({ where: { email: register.email } });
    if (!user) {
        const result = await User.create(register);
        return result;
    }
    return null;
};

module.exports = {
    userDb,
    createUser,
};