const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const product = require('./routes/product');
const user = require('./routes/user')
const category = require('./routes/category')
const order = require('./routes/order')


app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());

// app.get('/order',(req, res) => {
//     res.send('GUMANA NAA')
// })
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', category);
app.use('/api/v1', order);




module.exports = app