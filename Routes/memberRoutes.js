const express = require('express');
const router = express.Router();
const {
    getAllMembers,
    getAddMember,
    addMember,
    getEditMember,
    updateMember,
    deleteMember
} = require('../Controller/memberController');

router.get('/', getAllMembers);
router.get('/add', getAddMember);
router.post('/add', addMember);
router.get('/edit/:id', getEditMember);
router.put('/edit/:id', updateMember);
router.delete('/delete/:id', deleteMember);

module.exports = router;
