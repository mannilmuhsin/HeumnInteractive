const express = require('express');
const {
  borrowBook,
  returnBook,
  borrowHistory,
  mostBorrowedBooks,
  activeMembers,
  bookAvailability
} = require('../controllers/borrowController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/borrow', protect, borrowBook);
router.post('/return', protect, returnBook);
router.get('/history', protect, borrowHistory);
router.get('/most-borrowed', protect, admin, mostBorrowedBooks);
router.get('/active-members', protect, admin, activeMembers);
router.get('/availability', protect, admin, bookAvailability);

module.exports = router;
