const mongooes = require('mongoose');
const Schema = mongooes.Schema

const Coin = new Schema({
        name: {
            type: String
        },
        price: {
            type: Number
        }
    },
        { collection: `coins` })


module.exports = mongooes.model(`Coin`, Coin)