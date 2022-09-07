const Movie = require('./Movie');
const Theater = require('./Theater');
const Screen = require('./MovieScreen');

const movies = [
    new Movie('Movie 1'),
    new Movie('Movie 2'),
    new Movie('Movie 3'),
    new Movie('Movie 4')
];

const screens = [
    new Screen(10, movies[0]._id),
    new Screen(10, movies[1]._id),
    new Screen(10, movies[2]._id),
    new Screen(10, movies[3]._id),
    new Screen(10, movies[2]._id),
]

const theater = new Theater(movies, screens);

module.exports = theater;