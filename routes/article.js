const router = require('express').Router();

const ArticleService = require('../services/article');

router.post('/', ArticleService.post);
router.get('/', ArticleService.get);
router.get('/:id', ArticleService.detail);
router.put('/:id', ArticleService.put);
router.delete('/:id', ArticleService.delete);
 
module.exports = router; 
