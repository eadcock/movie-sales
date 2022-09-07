const Movie = require('./Movie');
const theater = require('./TheaterManager');

module.exports.getMovie = (id) => {
    const movie = theater.movies.get(id);
    if(!movie) {
        return { error: 'Movie not found' };
    }

    return movie;
}

module.exports.getMovies = () => {
    return [...theater.movies.values()];
}

module.exports.getMoviesById = (ids) => {
    return ids.map(id => theater.movies.get(id));
}

module.exports.getScreen = (id) => {
    const screen = theater.screens.get(id);
    if(!screen) {
        return { error: 'Screen not found' };
    }

    return screen;
}

module.exports.getScreens = () => {
    return [...theater.screens.values()];
}

module.exports.setMovie = (id, movie) => {
    const screen = theater.screens.get(id);
    if(!screen) {
        return res.status(401).json({ error: 'Screen not found' });
    }

    screen.currentMovie = movie;

    return [...theater.screens.values()];
}

module.exports.setTitle = (id, title) => {
    const movie = theater.movies.get(id);
    if(!movie) {
        return res.status(401).json({ error: 'Movie not found' });
    }

    movie._title = title;

    return movie;
}

module.exports.addMovie = (title) => {
    const movie = new Movie(title);
    theater.movies.set(movie._id, movie);

    return [...theater.movies.values()];
}

module.exports.deleteMovie = (id) => {
    theater.movies.delete(id);
    return [...theater.movies.values()];
}

module.exports.setTickets = (id, tickets) => {
    const screen = theater.screens.get(id);
    if(!screen) {
        return res.status(401).json({ error: 'Screen not found' });
    }

    screen.maxTickets = tickets;

    return [...theater.screens.values()];

}

module.exports.makeSale = (id, numTickets) => {
    const screen = theater.screens.get(id);
    if(!screen) {
        return res.status(401).json({ error: 'Screen not found' });
    }

    screen.sales += numTickets;

    return [...theater.screens.values()];
}