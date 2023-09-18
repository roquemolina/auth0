const express = require('express');
const indexRouter = require('./routes/index.js');

const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
  //acces token & token_type
  clientSecret: process.env.CLIENTSECRET,
  authorizationParams: {
    response_type: 'code',
    audience: "http://localhost:5000",
    scope: 'openid profile email leer:dato'
  }

};

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//auth mimddleware vvvv
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use('/', indexRouter);

app.listen(process.env.PORT, () => {
  console.log('Express is running on port 3000');
});
