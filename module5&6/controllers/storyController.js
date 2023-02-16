const model = require('../models/story');
exports.index = (req, res)=>{
    //res.send('send all stories');
    let stories = model.find();
    res.render('./story/index', {stories});
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res)=>{
    //res.send('Created a new story');
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

exports.show = (req, res)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/show', {story});
    } else {
        res.status(404).send('Cannot find story with id ' + id);
    }
};

exports.edit = (req, res)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/edit', {story});
    } else {
        res.status(404).send('Cannot find story with id ' + id);
    }
};

exports.update = (req, res)=>{
    res.send('update story with id ' + req.params.id);
};

exports.delete = (req, res)=>{
    res.send('delete story with id ' + req.params.id);
};