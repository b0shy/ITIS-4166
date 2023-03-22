const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: { type: String },
    category: { type: String, required: [true, 'category is required'] },
    title: { type: String, required: [true, 'title is required'] },
    content: {
        type: String, required: [true, 'content is required'],
        minLength: [10, 'the content should have at least 10 characters']
    },
    location: { type: String, required: [true, 'location is required'] },
    start: { type: String, required: [true, 'start is required'] },
    end: { type: String, required: [true, 'end is required'] },
    host: { type: String, required: [true, 'host is required'] },
    createdAt: { type: String },
    image: { type: String, required: [true, 'image is required'] }
},
    { timestamps: true }
);

//collection name is event in the database
module.exports = mongoose.model('project3.Event', eventSchema);