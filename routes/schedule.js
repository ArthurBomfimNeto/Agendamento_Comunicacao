const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const scheduleController = require('../controllers/schedule_controller');

router.get('/', scheduleController.getScheduling);
router.post('/',login, scheduleController.postScheduling);
router.patch('/',login, scheduleController.patchScheduling);
router.get('/:id_schedule', scheduleController.get1Scheduling);
router.delete('/:id_schedule',login, scheduleController.deleteScheduling);

module.exports = router;
