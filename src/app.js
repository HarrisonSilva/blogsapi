const express = require('express');
const controllerLogin = require('./controller/loginController');
const middlewareLogin = require('./middlewares/loginMIddleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', middlewareLogin, controllerLogin.userlogin);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
