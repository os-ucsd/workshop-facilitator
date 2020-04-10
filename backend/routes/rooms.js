/*
Holds the API routes having to deal with the workshop rooms
*/
const express = require('express');
const router = express.Router();
const WorkshopRoom = require("../models/workshop_room.model.js"); //added to be able to use Schema



/*
@route GET /rooms/
@desc Gets a list of all current workshop rooms
*/
router.route('/').get((req, res) => {
    // database query
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("fetching all rooms...");

    WorkshopRoom.find()
        .then(rooms => res.json(rooms))
        .catch(err => res.status(400).json(err))
})


/*
@route POST /rooms/create
@desc Creates a new workshop room
*/
router.route('/create').post((req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    /* for testing
    console.log("in /create Route");
    console.log("Here is the req,body below");
    console.log(req.body);
    */

    // database query
    //use req.body info to create new room, save it
    console.log(req.body);

    const newRoom = new WorkshopRoom({
        hostCode: req.body.hostCode,
        name: req.body.name,
        wsTitle: req.body.wsTitle,
        wsDescript: req.body.wsDescript,
        joinCode: req.body.joinCode,
        resources: [],
        questions: [], // will contain {title:"", description:""}
        attendees: [],
        wfclickers: [], //w ill contain { id: "" clicker:"", answers:[], correct:""}
        feedback: ""
    });

    console.log("Here is the room that just got created:");
    console.log(newRoom);

    newRoom.save()
        .then(() => res.json(newRoom)) //not redirecting properly
        .catch(err => console.log(err));
        //.catch(err => err.status(400).json(err));

})

/*
@route GET /rooms/:id
@desc Gets a specific room with the given ID
*/
router.route('/:id').get((req, res) => {
    const roomId = req.params.id;
    // database query
    WorkshopRoom.findById(roomId)
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
    WorkshopRoom.findById(roomId)
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
    //const question = req.body.question;
    const question = req.body;
    console.log(question);
    // database query
    WorkshopRoom.findById(roomId)
        .then(room => {
            //let questions = room.questions;
            room.questions.push(question);
            // save the room with the updated questions array
            room.save()
                .then(() => res.json(room))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(404).json(err));;
})

/*
@route GET /rooms/:roomId/questions/:qId
@desc Gets a specific question in a specific room
*/
router.route('/:roomId/questions/:qId').get((req, res) => {
    const roomId = req.params.roomId;
    const questionId = req.params.qId;

    WorkshopRoom.findById(roomId, (err, room) => {
        if(err) {
            //res.send(err)
            res.json(err);
        }
        else {
           // res.send(question)
           var question = room.questions.filter(id => id.equals(questionId))
           res.json(question);
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
    WorkshopRoom.findById(roomId)
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
    //const wfclicker = req.body.clicker;
    const wfclicker = req.body;
    // database query
    WorkshopRoom.findById(roomId)
        .then(room => {
            //let wfclickers = room.wfclickers;
            room.wfclickers.push(wfclicker);
            room.save()
                .then(() => res.json(room.wfclickers))
                .catch(err => res.status(400).json(err))
        });
})

/*
@route GET /rooms/:roomId/clickers/:cId
@desc Gets a specific clicker question from a specific room
*/
router.route('/:roomId/clickers/:cId').get((req, res) => {
    const roomId = req.params.roomId;
    const wfclickerId = req.params.cId;

    WorkshopRoom.findById(roomId)
        .then(room => {
            const clicker = room.wfclickers.filter(clicker => clicker ? clicker._id.toString() === wfclickerId : null);
            res.json(clicker);
        })
        .catch(err => res.status(404).json(err));
})

/*
@route POST /rooms/resources/upload
@desc uploads a file resource to the database
*/
router.route("/resources/upload").post((req, res) => {
    // req should contain the file to upload
})

/*
@route GET /rooms/resources/:name
@desc uploads a file resource to the database
*/
router.route("/resources/:name").get((req, res) => {
    // find the file resource with the given name
})

/*
@route GET /rooms/resources/
@desc get all resources in the file resources list
*/
router.route("/resources/").get((req, res) => {
    // find the file resource with the given name
})

module.exports = router;
