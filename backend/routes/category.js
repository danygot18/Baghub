const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewCategory,
    GetCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/category/new', isAuthenticatedUser, upload.array('images'), NewCategory);
router.get('/category', GetCategory);
router.put('/category/update/:id',upload.array('images', 10), updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;