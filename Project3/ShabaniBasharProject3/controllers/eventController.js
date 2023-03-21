const model = require('../models/event');
const multer  = require('multer');
const { fileUpload } = require('../middleware/fileUpload');
const upload = multer({ dest: 'uploads/' });

exports.index = (req, res)=>{
    let events = model.find();
    res.render('./event/index', {events});
};

exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res)=>{
    let event = req.body;
    event.image = req.file.filename;
    res.render('./event/show', { event: event });
    console.log(req.file.filename);
    model.save(event);
    res.redirect('/events');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/show', {event});
    }else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        // Check if the event already has an image
        let hasImage = false;
        if (event.image) {
            hasImage = true;
        }

        // Render the edit page and pass the event data
        res.render('./event/edit', {event, hasImage});
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    
    // Check if a new image file was uploaded
    if (req.file) {
        event.image = req.file.filename;
        res.render('./event/show', { event: event });
    }

    if(model.updateById(id, event)){
        res.redirect('/events/' + id);
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};


exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    }else{
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};
