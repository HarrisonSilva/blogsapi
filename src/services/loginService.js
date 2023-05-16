const { User } = require('../models');

const userDb = (email) => {
    const getUsers = User.findOne({ where: { email } });
    return getUsers;
};

const createUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error('User already registered');
    }
    const result = await User.create({ displayName, email, password, image });
    return result;
};

module.exports = {
    userDb,
    createUser,
};