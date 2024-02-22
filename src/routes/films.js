const express = require('express');
const router = express.Router();

const filmscontroller = require('../controllers/films.controller');

router.get('/', (req, res) => {

    filmscontroller.trouveFilmType(req,res);
});


module.exports = router;