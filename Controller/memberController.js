const Member = require('../Model/Member');

// GET all members (with optional search)
const getAllMembers = async (req, res) => {
    try {
        const search = req.query.search || '';
        let query = {};
        if (search) {
            query = { name: { $regex: search, $options: 'i' } };
        }
        const members = await Member.find(query).sort({ createdAt: -1 });
        res.render('members/index', {
            members,
            search,
            success: req.query.success || '',
            error: req.query.error || ''
        });
    } catch (err) {
        res.redirect('/members?error=Failed to fetch members');
    }
};

// GET add member form
const getAddMember = (req, res) => {
    res.render('members/add', { error: '' });
};

// POST add new member
const addMember = async (req, res) => {
    try {
        const { name, email, mobile, address, membershipDate } = req.body;
        await Member.create({ name, email, mobile, address, membershipDate });
        res.redirect('/members?success=Member added successfully');
    } catch (err) {
        let errorMsg = 'Failed to add member';
        if (err.code === 11000) errorMsg = 'Email already registered';
        res.render('members/add', { error: errorMsg });
    }
};

// GET edit member form
const getEditMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.redirect('/members?error=Member not found');
        res.render('members/edit', { member, error: '' });
    } catch (err) {
        res.redirect('/members?error=Failed to load member');
    }
};

// PUT update member
const updateMember = async (req, res) => {
    try {
        const { name, email, mobile, address, membershipDate } = req.body;
        await Member.findByIdAndUpdate(req.params.id, {
            name, email, mobile, address, membershipDate
        }, { new: true, runValidators: true });
        res.redirect('/members?success=Member updated successfully');
    } catch (err) {
        let errorMsg = 'Failed to update member';
        if (err.code === 11000) errorMsg = 'Email already registered';
        const member = await Member.findById(req.params.id);
        res.render('members/edit', { member, error: errorMsg });
    }
};

// DELETE member
const deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.redirect('/members?success=Member deleted successfully');
    } catch (err) {
        res.redirect('/members?error=Failed to delete member');
    }
};

module.exports = { getAllMembers, getAddMember, addMember, getEditMember, updateMember, deleteMember };
