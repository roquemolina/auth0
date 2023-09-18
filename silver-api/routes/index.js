const express = require('express');
const router = express.Router();
const {requiresAuth} = require('express-openid-connect');
const axios = require('axios');

const { auth } = require('express-oauth2-jwt-bearer');


router.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});
router.get('/secured', requiresAuth(), async (req, res) => {
  let data = {}
  let scopedData = {}

  const { token_type, access_token } = req.oidc.accessToken
  

  try {
    const apiResponse = await axios.get('http://localhost:5000/private',
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    })
    data = apiResponse.data
  } catch (error) { }
  try {
    const apiResponse = await axios.get('http://localhost:5000/scoped',
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    })
    scopedData = apiResponse.data
  } catch (error) { }

  res.render('secured', {
    title: 'Secured Page',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data,
    scopedData
  });
});

module.exports = router;