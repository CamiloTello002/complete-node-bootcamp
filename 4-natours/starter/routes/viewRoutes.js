const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// This middleware will be executed every single time there's a request
router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
// router.get('/tour', viewController.getTour);
router.get('/tour/:tourSlug', viewController.getTour);
router.get('/login', viewController.login);

module.exports = router;
