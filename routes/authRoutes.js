const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.get('/', (req,res)=>{
    try {
        res.send("success")
    } catch (error) {
        console.log(error.message);
    }
});
router.post('/register', register);
router.post('/login', login);

module.exports = router;
