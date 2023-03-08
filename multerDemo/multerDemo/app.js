const express = require('express');
const morgan = require('morgan');

const {fileUpload} = require('./middleware/fileUpload');


const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', fileUpload, (req, res, next) => {
    let image =  "./images/" + req.file.filename;
    res.render('index', {image});
});

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error:err});
});

app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})

