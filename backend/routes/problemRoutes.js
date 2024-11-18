const express = require('express');
const { submitCode } = require('../controllers/problemController');
const router = express.Router();

router.post('/submit', submitCode);

module.exports = router;