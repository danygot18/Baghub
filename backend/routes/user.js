const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/register', upload.single("avatar"), registerUser);

module.exports = router;