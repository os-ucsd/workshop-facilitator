var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    hostCode: String,
    name: String,
    joinCode: Number,
    resources: {
        name: String,
        link: String
    },
    questions: {
        title: String,
        description: String
    },
    attendees: [String],
    wfclickers: [{
        clicker: String,
        answers: [String],
        correct: String
    }],
    feedback: String
});

var WorkshopRoom = mongoose.model('WorkshopRoom', roomSchema);
module.exports = WorkshopRoom;