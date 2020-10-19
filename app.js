const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeSchedule = require('./routes/schedule')
const routeUser = require('./routes/users')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/schedule', routeSchedule);
app.use('/users', routeUser)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPITIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }
    next();
});

app.use((req, res, next) => {
    const erro = new Error('Not found');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => { 
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    });
});

module.exports = app;