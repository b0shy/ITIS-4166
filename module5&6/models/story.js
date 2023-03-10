const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const stories = [
{
    id: '1',
    title: 'My life at Charlotte',
    content: 'My life at Charlotte is great. I was born and raised in Charlotte. As I was growing up I got to watch the city of Charlotte grow around me.',
    author: 'Bashar Shabani',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '2',
    title: 'Learning NBAD',
    content: 'Learning NBAD has been awesome so far. We are using languages I have used in the past so it has been easy picking up on the new information we are learning.',
    author: 'Bashar Shabani',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '3',
    title: 'My Spring Break',
    content: 'For this upcoming spring break I am going to be traveling to San Diego, California. My cousing just moved there from Amman, Jordan, so I am excited to go see him.',
    author: 'Bashar Shabani',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}
];

exports. find = () => stories;

exports.findById = id => stories.find(story=>story.id === id);

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updatebyId = function(id, newStory){
    let story = stories.find(story=>story.id === id);
    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = stories.findIndex(story =>story.id === id);
    if(index !== -1){
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
}