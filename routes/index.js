const router = require('express').Router();

const doctorRoutes = require('./doctor');
const questionRoutes = require('./question');
const answerRoutes = require('./answer');
const articleRoutes = require('./article');

const auth = require('../service/auth');
const index = require('../service/index');

router.use('/doctors', doctorRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/articles', articleRoutes);
router.post('/login', auth.loginDoctor);
router.use('/', index);

module.exports = router