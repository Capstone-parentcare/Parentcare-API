const router = require('express').Router();

const answerService = require('../service/answer');

router.get('/', answerService.get);
router.get('/:id', answerService.detail);
router.get('/question/:question_id', answerService.getByQuestionId);
router.post('/', answerService.post);
router.put('/:id', answerService.edit);
router.delete('/:id', answerService.delete);

module.exports = router;