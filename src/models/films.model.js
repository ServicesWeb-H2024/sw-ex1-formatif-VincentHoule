const sql = require("../config/db.js");

const Films = (films) => {
    this.title = films.title,
    this.director = films.director,
    this.actors = films.actors,
    this.country = films.country,
    this.date_added = films.date_added,
    this.release_year = films.release_year,
    this.rating = films.rating,
    this.duration = films.duration,
    this.listed_in = films.listed_in,
    this.description = films.description
}

Films.trouveFilmType = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT show_id, title
        FROM netflix_titles WHERE show_type = ?;`;
        const params = [type];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });

}


module.exports = Films;