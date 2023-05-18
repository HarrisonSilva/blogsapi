const { User, Category, BlogPost, PostCategory } = require('../models');

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

const getUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    
    return users;
};

const getUsersId = async (id) => {
    const userId = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!userId) {
        throw new Error('User does not exist');
    }
    return userId;
};

const createCategory = async (name) => {
    const categories = await Category.create({ name });
    if (!name) {
        throw new Error('"name" is required');
    }
    return categories;
};

const getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

const addPost = async ({ title, content, categoryIds, userId }) => {
    const categories = await getCategories();
    const findById = categories.map((item) => item.id);
    const getIds = categoryIds.every((item) => findById.includes(item));
    if (!getIds) {
        throw new Error('one or more "categoryIds" not found');
    }
    const post = await BlogPost.create({ title, content, userId });
    await Promise.all(categoryIds.map((item) => 
    PostCategory.create({ postId: post.dataValues.id, categoryId: item })));
    return post;
};

module.exports = {
    userDb,
    createUser,
    getUsers,
    getUsersId,
    createCategory,
    getCategories,
    addPost,
};