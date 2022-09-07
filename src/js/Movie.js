const { nanoid } = require('nanoid')

module.exports = class Movie {
    _id;
    _title;
    sales;

    constructor(title) {
        this._title = title;
        this.sales = 0;
        this._id = nanoid();
    }
}