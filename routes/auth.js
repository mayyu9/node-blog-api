const express = require('express');
const { handleUserSignup } = require('../controllers/auth');

const router = express.Router();


router.post('/signup', handleUserSignup);

// router.post('/sigin');

module.exports = router;
