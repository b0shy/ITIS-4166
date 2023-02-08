const model = require('../models/story');
exports.index = (req, res)=>{
    //res.send('send all stories');
    let stories = model.find();
    res.render('./story/index', {stories});
};

exports.new = (req, res)=>{
    res.send('send the new form');
};

exports.create = (req, res)=>{
    res.send('Create a new story');
};

exports.show = (req, res)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/show', {story});
    }
    res.status(404).send('Cannot find story with id ' + id);
};

exports.edit = (req, res)=>{
    res.send('send the edit form');
};

exports.update = (req, res)=>{
    res.send('update story with id ' + req.params.id);
};

exports.delete = (req, res)=>{
    res.send('delete story with id ' + req.params.id);
};