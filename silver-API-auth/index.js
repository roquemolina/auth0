const express = require('express');
const app = express();

const { auth } = require('express-oauth2-jwt-bearer');

// required scopes
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const checkScopes = requiredScopes('leer:dato');

const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
//app.use(jwtCheck);

/* app.get('/public', (req, res) => {
  res.json({
    type: "public"
  })
}) */
app.get('/private', jwtCheck, (req, res) => {
  res.json({
    type: "private"
  })
})
app.get('/scoped', jwtCheck, checkScopes, (req, res) => {
  console.log('pass scoped!')
  res.json({
    type: "scoped"
  })
})

app.listen(5000, () => {
  console.log('Express is running on port 5000');
});