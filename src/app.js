const express = require('express');
const controllerLogin = require('./controller/loginController');
const middlewareLogin = require('./middlewares/loginMIddleware');
const userController = require('./controller/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const tokenMiddleware = require('./middlewares/tokenMiddleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', middlewareLogin, controllerLogin.userlogin);

app.post(
'/user',
userMiddleware.validateDisplay,
userMiddleware.validatePassword,
 userMiddleware.validateEmail,
    userController.createUser,
);

app.get('/user', tokenMiddleware.validateToken, userController.getUsers);

app.get('/user/:id', tokenMiddleware.validateToken, userController.getUserId);

app.post('/categories', tokenMiddleware.validateToken, userController.createCategories);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
