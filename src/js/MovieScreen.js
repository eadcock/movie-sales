const { nanoid } = require('nanoid')

module.exports = class MovieScreen {
    _id;
    sales;
    currentMovie;
    maxTickets;

    constructor(numTickets = 0, currentMovie = null) {
        this._id = nanoid();
        this.currentMovie = currentMovie;
        this.maxTickets = numTickets;
        this.sales = 0;
    }
}

