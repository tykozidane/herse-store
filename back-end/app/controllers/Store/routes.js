const express = require('express');
const router = express.Router();

const createStore = require('./create_store');
const { auth_admin } = require('../../middleware/check_token');

router.post('/create-new-store',auth_admin, createStore);

module.exports = router;