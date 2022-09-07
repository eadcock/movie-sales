module.exports = class Theater {
    screens = new Map();
    movies = new Map();

    /**
     * Create a new theater object
     * @param {[MovieScreen]} screens An array of MovieScreen objects
     */
    constructor(movies, screens) {
        screens.forEach(s => this.screens.set(s._id, s));
        movies.forEach(m => this.movies.set(m._id, m));
    }
}