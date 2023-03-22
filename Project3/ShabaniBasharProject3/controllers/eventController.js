const model = require('../models/event');
const multer = require('multer');
const { fileUpload } = require('../middleware/fileUpload');
const upload = multer({ dest: 'uploads/' });

exports.index = (req, res, next) => {
    model.find()
    .then(events=>res.render('./event/index', { events }))
    .catch(err=>next(err));
    
};

exports.new = (req, res) => {
    res.render('./event/new');
};

exports.create = (req, res, next) => {
    let event = new model(req.body); //create a new event document
    event.image = req.file.filename;
    //res.render('./event/show', { event: event });
    console.log(req.file.filename);
    event.save() //insert the document to the database
        .then((event) => {
            console.log(event);
            res.redirect('/events');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/show', { event });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        // Check if the event already has an image
        let hasImage = false;
        if (event.image) {
            hasImage = true;
        }

        // Render the edit page and pass the event data
        res.render('./event/edit', { event, hasImage });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    // Check if a new image file was uploaded
    if (req.file) {
        event.image = req.file.filename;
        res.render('./event/show', { event: event });
    }

    if (model.updateById(id, event)) {
        res.redirect('/events/' + id);
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};


exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};
