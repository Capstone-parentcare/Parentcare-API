const router = require('express').Router();

const fileService = require('../services/file');

router.post('/upload', fileService.userUpload);
router.get('/images', fileService.getImage);
router.get('/images/:images', fileService.getImageByParams);

module.exports = router;

