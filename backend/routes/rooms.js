/*
Holds the API routes having to deal with the workshop rooms
*/
const express = require('express');
const router = express.Router();
const Room = require('../models/workshop_room.model.js');

/*
@route GET /rooms/
@desc Gets a list of all current workshop rooms
*/
router.route('/').get((req, res) => {
    // database query
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => res.status(400).json(err));
})

/*
@route POST /rooms/create
@desc Creates a new workshop room
*/
router.route('/create').post((req, res) => {
    // database query
    const hostCode = req.body.hostCode;
    const name = req.body.name;
    const joinCode = req.body.joinCode;
    const resources = req.body.resources;
    const questions = req.body.questions;
    const attendees = req.body.attendees;
    const wfclickers = req.body.wfclickers;
    const feedback = req.body.feedback;

    const newRoom = new Room({
        hostCode,
        name,
        joinCode,
        resources,
        questions,
        attendees,
        wfclickers,
        feedback
    });

    newRoom.save()
        .then(() => res.json(newRoom))
        .catch(err => err.status(400).json(err));
})

/*
@route GET /rooms/:id
@desc Gets a specific room with the given ID
*/
router.route('/:id').get((req, res) => {
    const roomId = req.params.id;
    // database query
    Room.findById(roomId)   
        // send the room back to client-side
        .then(room => res.json(room))
        .catch(err => res.status(400).json(err));
})

/*
@route GET /rooms/:id/questions/
@desc Gets all questions in a given room
*/
router.route('/:id/questions/').get((req, res) => {
    const roomId = req.params.id;
    // database query
    Room.findById(roomId)   
        // send the questions back to client-side
        .then(room => res.json(room.questions))
        .catch(err => res.status(400).json(err));
})

/*
@route POST /rooms/questions/add
@desc Adds a new question to the specific workshop room
*/
router.route('/:id/questions/add').post((req, res) => {
    const roomId = req.params.id;
    const questions = req.body.questions;
    // database query
    Room.findByIdAndUpdate(roomId, {questions: questions},
        function(err, result){
            if(err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        }
    )
})

/*
@route GET /rooms/:roomId/questions/:qId
@desc Gets a specific question in a specific room
*/
router.route('/:roomId/questions/:qId').get((req, res) => {
    const roomId = req.params.roomId;
    const questionId = req.params.qId;

    Room.findById(roomId, (err, room) => {
        var question = room.questions.filter(id => id.equals(questionId))
        if(err) {
            res.send(err)
        }
        else {
            res.send(question)
        }
    })
})

/*
@route GET /rooms/:id/clickers/
@desc Gets all clicker questions in a specific room
*/
router.route('/:id/clickers/').get((req, res) => {
    const roomId = req.params.id;
    // database query
    Room.findById(roomId)   
        // send the clicker questions back to client-side
        .then(room => res.json(room.wfclickers))
        .catch(err => res.status(400).json(err));
})

/*
@route POST /rooms/:id/clickers/add
@desc Adds a clicker question to a specific workshop room
*/
router.route('/:id/clickers/add').post((req, res) => {
    const roomId = req.params.id;
    const wfclickers = req.body.wfclickers;
    // database query
    Room.findByIdAndUpdate(roomId, {wfclickers: wfclickers},
        function(err, result){
            if(err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        }
    )
})

/*
@route GET /rooms/:roomId/clickers/:cId
@desc Gets a specific clicker question from a specific room
*/
router.route('/:roomId/clickers/:cId').get((req, res) => {
    const roomId = req.params.roomId;
    const wfclickerId = req.params.cId;

    Room.findById(roomId, (err, room) => {
        var wfclicker = room.wfclickers.filter(id => id.equals(wfclickerId))
        if(err) {
            res.send(err)
        }
        else {
            res.send(wfclicker)
        }
    })
})

module.exports = router;