var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    hostCode: Number,
    name: String,
    //added to reflect states in Create.js
    wsTitle: String,
    wsDescript: String,
    joinCode: Number,
    resources: [{
        title: String,
        src: String,
        resType: String
    }],
    questions: [String],
    // list of emails
    attendees: [{
        email: String,
        followup: Boolean
    }],
    polls: [{
        id: String,
        question: String,
        answers: [String],
        correct: String
    }],
    // email template
    feedback: String
});

var WorkshopRoom = mongoose.model('WorkshopRoom', roomSchema);
module.exports = WorkshopRoom;
