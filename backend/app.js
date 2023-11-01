const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());

app.get('/order',(req, res) => {
    res.send('GUMANA NAA')
})


module.exports = app