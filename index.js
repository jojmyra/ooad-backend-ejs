const express = require('express')
const app = express()
const port = 3000
const path = require(`path`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)

// route
const CoinRouter = require('./routes/CoinRouter');

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://admin:admin123456@ds253094.mlab.com:53094/ooad59160548`)

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
 });


app.use('/coins', CoinRouter);


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
