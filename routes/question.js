const router = require('express').Router();

const questionService = require('../services/question');

router.get('/', questionService.get);
router.get('/:id', questionService.detail);
router.post('/', questionService.post);
router.delete('/:id', questionService.delete);

module.exports = router;