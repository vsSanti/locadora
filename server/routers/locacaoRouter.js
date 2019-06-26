const express = require('express')
const FilmeController = require('../controllers/filmeController')
const auth = require('../middleware/auth')
const router = new express.Router()



module.exports = router