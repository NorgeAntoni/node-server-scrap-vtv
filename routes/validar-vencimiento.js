const { Router } = require('express');
const usPost = require('../controllers/validar-vencimiento');

const router = Router();

router.post('/', usPost);


module.exports = router;