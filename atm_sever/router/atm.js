const router = require('express').Router();
const { Authenticate } = require('../middleWares/auth');
const {postAtm, deleteAtm, getAtms, addPeople} = require('../controller/atm')

router.post('/', Authenticate, postAtm);
router.post('/people', Authenticate, addPeople);
router.get('/', Authenticate, getAtms);
router.delete('/:atmId', Authenticate, deleteAtm);

module.exports = router;