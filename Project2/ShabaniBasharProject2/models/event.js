const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const events = [
    {
        id: '1',
        category: 'Sports',
        title: 'Soccer at Strikers!',
        content: 'Come join us for a fun and competitive game of soccer!',
        location: 'Striker Soccer Center - Indian Trail',
        start: desiredDateTime = new Date(2023, 1, 28, 14, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 1, 28, 18, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Strikers Soccer Center',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'soccerball-image.png'
    },
    {
        id: '2',
        category: 'Sports',
        title: 'Flag Football!',
        content: 'Come join us for a fun and competetive game of flag football!',
        location: 'Freedom Park',
        start: desiredDateTime = new Date(2023, 2, 3, 08, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 2, 3, 11, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Charlotte Flag Football',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'football-image.png'
    },
    {
        id: '3',
        category: 'Sports',
        title: 'Volleyball at Lake Norman!',
        content: 'Come join us for a fun and competetive game of volleyball!',
        location: 'Lake Norman',
        start: desiredDateTime = new Date(2023, 2, 3, 08, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 2, 3, 11, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Lake Norman Volleyball Club',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'volleyball-image.png'
    },
    {
        id: '4',
        category: 'Video Games',
        title: 'Mario Kart Derby!',
        content: 'Come join us for a fun and competetive tournament of Mario Kart!',
        location: 'Charlotte Gaming Clubhouse',
        start: desiredDateTime = new Date(2023, 2, 3, 08, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 2, 3, 11, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Charlotte Gaming Club',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'mariokart-image.png'
    },
    {
        id: '5',
        category: 'Video Games',
        title: 'Smash Bros. Tournament!',
        content: 'Come join us for a fun and competetive tournament of Smash Bros!',
        location: 'Charlotte Gaming Clubhouse',
        start: desiredDateTime = new Date(2023, 2, 3, 08, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 2, 3, 11, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Charlotte Gaming Club',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'smashbros-image.png'
    },
    {
        id: '6',
        category: 'Video Games',
        title: 'Fifa 23 Skills Challenge!',
        content: 'Come join us for a fun and competetive matchup of Fifa 23 Skills Challenges!',
        location: 'Charlotte Gaming Clubhouse',
        start: desiredDateTime = new Date(2023, 2, 3, 08, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        end: desiredDateTime = new Date(2023, 2, 3, 11, 30).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        host: 'Charlotte Gaming Club',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: 'fifa23-image.png'
    }
];

exports.find = () => events;

exports.findById = id => events.find(event => event.id === id);

exports.save = function (event) {
    event.id = uuidv4();
    event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT);
    event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_SHORT);
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
};

exports.updateById = function(id, newEvent){
    let event = events.find(event => event.id === id);
    if(event){
        event.category = newEvent.category;
        event.title = newEvent.title;
        event.host = newEvent.host;
        event.content = newEvent.content;
        event.location = newEvent.location;
        event.start = DateTime.fromISO(newEvent.start).toLocaleString(DateTime.DATETIME_SHORT);
        event.end = DateTime.fromISO(newEvent.end).toLocaleString(DateTime.DATETIME_SHORT);
        event.image = newEvent.filename;
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id){
    let index = events.findIndex(event => event.id === id);
    if(index !== -1){
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
};