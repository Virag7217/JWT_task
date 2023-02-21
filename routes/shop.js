const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');


router.get('/', shopController.getHome);


module.exports = router;