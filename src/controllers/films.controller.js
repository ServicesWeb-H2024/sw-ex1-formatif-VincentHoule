const Films = require("../models/films.model.js");

exports.trouveFilmType = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.query.type_titre || req.query.type_titre == "") {
        res.status(400);
        res.send({
            message: "Le type ne doit pas être vide"
        });
        return;
    }

    if (req.query.type_titre == "film") {
        req.query.type_titre = "Movie";
    }
    else if (req.query.type_titre == "serie") {
        req.query.type_titre = "TV SHOW";
    }
    else {
        res.status(400);
        res.send({
            erreur: `Le type ${req.query.type_titre}`
        });
        return;
    }

    if (!req.query.page || parseInt(req.query.page) <= 0) {
        res.status(400);
        res.send({
            erreur: "La page ne doit pas être vide ou égale à 0 et moins"
        });
        return;
    }

    Films.trouveFilmType(req.query.type_titre)
        .then((Films) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Films[0]) {
                res.status(404);
                res.send({
                    erreur: `film introuvable ${req.query.type_titre}`
                });
                return;
            }

            page_suivante = `/api/films/type_titre?page=${parseInt(req.query.page) + 1}`;
            if (parseInt(req.query.page) + 1 > Math.ceil(Films.length / 10))
            {
                page_suivante = null;
            }
            
            res.send({
                Films: Films.slice(req.query.page * 10 - 10, req.query.page * 10),
                filtre: req.query.type_titre,
                url_page_suivante: page_suivante,
            });

        })

        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération du film avec le type" + req.query.type
            });
        });
};