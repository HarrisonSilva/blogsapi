const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const jwtSecret = process.env.JWT_SECRET;
const tokenConfig = { expiresIn: '7d' };

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        await loginService.createUser({ displayName, email, password, image });
           const token = jwt.sign({ email: req.body.email }, jwtSecret, tokenConfig);
          res.status(201).json({ token });
    } catch (error) {
        return res.status(409).json({ message: 'User already registered',
    });
    }
};

const getUsers = async (req, res) => {
   const users = await loginService.getUsers();
    return res.status(200).json(users);
};

const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await loginService.getUsersId(id);
        res.status(200).json(userId);
    } catch (error) {
        return res.status(404).json({ message: 'User does not exist' });
    }
};

const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        const addCategory = await loginService.createCategory(name);
        res.status(201).json(addCategory);
    } catch (error) {
        res.status(400).json({ message: '"name" is required' });
    }
};

const getCategories = async (_req, res) => {
    const categories = await loginService.getCategories();
    return res.status(200).json(categories);
};

const addPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const { userId } = req.token;
        const createPost = await loginService.addPost({ title, content, categoryIds, userId });
     /*    if (createPost) {
            throw Error;
        } */
        return res.status(201).json(createPost);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserId,
    createCategories,
    getCategories,
    addPost,
};