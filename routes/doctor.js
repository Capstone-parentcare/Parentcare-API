const router = require('express').Router();

const doctorService = require('../services/doctor');

router.post('/', doctorService.post);
router.get('/', doctorService.get);
router.get('/:id', doctorService.detail);
router.delete('/:id', doctorService.delete);
module.exports = router;