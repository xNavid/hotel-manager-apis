
const express = require('express');
const router = new express.Router();

router.get('/user', async (req, res) => {
    res.send('Hello')
})

module.exports = router;
