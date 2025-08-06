const express = require('express');
const router = express.Router();
const firewallController = require('../controllers/firewallController');
const auth = require('../middleware/authMiddleware');

// Routes
router.get('/rules', auth, firewallController.getRules);
router.post('/rules', auth, firewallController.createRule);
router.post('/simulate', auth, firewallController.simulatePacket);
router.delete('/rules/:id', firewallController.deleteRule);

module.exports = router;
