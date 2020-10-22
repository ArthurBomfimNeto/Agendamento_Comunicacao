const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const scheduleController = require('../controllers/schedule_controller');

router.get('/', scheduleController.getScheduling);
router.use(login);
router.post('/', scheduleController.postScheduling);
router.patch('/:id_schedule', scheduleController.patchScheduling);
router.get('/:id_schedule', scheduleController.get1Scheduling);
router.delete('/:id_schedule', scheduleController.deleteScheduling);

module.exports = router;
