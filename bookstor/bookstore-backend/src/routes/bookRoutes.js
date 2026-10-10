const router = require('express').Router();
const c = require('../controllers/bookController');

router.route('/').get(c.getBooks).post(c.createBook);
router.route('/:id').get(c.getBook).put(c.updateBook).delete(c.deleteBook);

module.exports = router;
