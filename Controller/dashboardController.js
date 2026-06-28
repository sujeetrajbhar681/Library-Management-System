const Book = require('../Model/Book');
const Member = require('../Model/Member');

const getDashboard = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalMembers = await Member.countDocuments();
        const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
        const recentMembers = await Member.find().sort({ createdAt: -1 }).limit(5);

        res.render('dashboard', {
            totalBooks,
            totalMembers,
            recentBooks,
            recentMembers
        });
    } catch (err) {
        res.render('dashboard', {
            totalBooks: 0,
            totalMembers: 0,
            recentBooks: [],
            recentMembers: []
        });
    }
};

module.exports = { getDashboard };
