const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewCategory,
    GetCategory,
    deleteCategory,
    updateCategory,
    getSingleCategory

} = require('../controllers/categoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/admin/category/new', isAuthenticatedUser, upload.array('images'), NewCategory);
router.get('/admin/category/:id', getSingleCategory);
router.get('/admin/categories', GetCategory);
router.put('/admin/category/update/:id', upload.array('images'), updateCategory);
router.delete('/admin/category/:id', deleteCategory);

module.exports = router;