/*
Holds the API routes having to deal with the workshop rooms
*/
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
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
    console.log("in /create Route");
    console.log("Here is the req,body below");
    console.log(req.body);

    // database query
    //use req.body info to create new room, save it

    // 4/21 Please don't change,
    const newRoom = new WorkshopRoom({
        hostCode: req.body.joinCodeHost,
        name: req.body.nameForm,
        wsTitle: req.body.wsTitleForm,
        wsDescript: req.body.wsDescriptForm,
        joinCode: req.body.joinCodeUser,
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
            room.questions.push(question.question);
            console.log(room.questions);
            // save the room with the updated questions array
            room.save()
                .then(() => res.json(room))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(404).json(err));
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
@route GET /rooms/:id/polls/
@desc Gets all clicker questions in a specific room
*/
router.route('/:id/polls/').get((req, res) => {
    const roomId = req.params.id;
    console.log(`getting all polls for room ${roomId}`)
    // database query
    WorkshopRoom.findById(roomId)
        // send the clicker questions back to client-side
        .then(room => res.json(room.polls))
        .catch(err => res.status(400).json(err));
})

/*
@route POST /rooms/:id/polls/add
@desc Adds a clicker question to a specific workshop room
*/
router.route('/:id/polls/add').post((req, res) => {
    const roomId = req.params.id;
    //const wfclicker = req.body.clicker;
    const wfclicker = req.body;
    console.log(wfclicker);
    // database query
    WorkshopRoom.findById(roomId)
        .then(room => {
            //let wfclickers = room.wfclickers;
            room.polls.push(wfclicker);
            room.save()
                .then(() => res.json(room.polls))
                .catch(err => res.status(400).json(err))
        });
})

/*
@route POST /rooms/:id/polls/delete
@desc Adds a clicker question to a specific workshop room
*/
router.route('/:id/polls/delete').post((req, res) => {
    const roomId = req.params.id;
    //const wfclicker = req.body.clicker;
    const {pollId} = req.body;
    console.log(pollId);
    // database query
    WorkshopRoom.findById(roomId)
        .then(room => {
            //let wfclickers = room.wfclickers;
            const indexOfPoll = findIndexOfPoll(pollId, room);
            if (indexOfPoll == -1) res.status(404).json({"err": `no such poll in room ${roomId}`});
            else{
                room.polls.splice(indexOfPoll, 1);
                room.save()
                    .then(() => res.json(room.polls))
                    .catch(err => res.status(400).json(err))
            }
        });
})

findIndexOfPoll = (pollId, room) => {
    const {polls} = room;
    for (let i = 0; i < polls.length; i++){
        if (polls[i]._id.toString() === pollId) return i;
    }
    return -1;
}

/*
@route GET /rooms/:roomId/polls/:cId
@desc Gets a specific clicker question from a specific room
*/
router.route('/:roomId/polls/:cId').get((req, res) => {
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
@route POST /rooms/:roomId/resources/upload
@desc uploads a file resource to the database
*/
router.route("/:roomId/resources/upload").post((req, res) => {
    // req should contain the file to upload
    const roomId = req.params.roomId;
    const resource = req.body;
    console.log(roomId)
    WorkshopRoom.findById(roomId)
        .then(room => {
            room.resources.push(resource);
            room.save()
                .then(() => res.json(room.resources))
                .catch(err => res.status(400).json(err))
        })
})

/*
@route GET /rooms/:roomId/resources/
@desc uploads a file resource to the database
*/
router.route("/:roomId/resources/").get((req, res) => {
    // find the file resource with the given name
    const roomId = req.params.roomId;
    
    WorkshopRoom.findById(roomId)
        .then(room => res.json(room.resources))
        .catch(err => res.status(400).json(err));
})

/*
@route GET /rooms/resources/
@desc get all resources in the file resources list
*/
router.route("/resources/").get((req, res) => {
    // find the file resource with the given name
})

/*
@route POST /rooms/feedback/add
@desc Adds a new attendee to the specific workshop room
*/
router.route('/:id/feedback/add').post((req, res) => {
    const roomId = req.params.id;
    const email = req.body;
    // database query
    WorkshopRoom.findById(roomId)
        .then(room => {
            //let questions = room.questions;
            room.attendees.push(email.email);
            // save the room with the updated questions array
            room.save()
                .then(() => res.json(room))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(404).json(err));;
})

/*
@route GET /rooms/:id/feedback/
@desc Gets all the emails in a given room
*/
router.route('/:id/feedback/').get((req, res) => {
    const roomId = req.params.id;
    // database query
    WorkshopRoom.findById(roomId)
        // send the emails back to client-side
        .then(room => res.json(room.attendees))
        .catch(err => res.status(400).json(err));
})

/*
@route sends out emails
*/
router.route('/:id/feedback/send').post((req, res) => {
    let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    //service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'jaime.beatty@ethereal.email', 
        pass: 'AeyDDBBbau7N4kWqvy'  
    },
    tls:{
        rejectUnauthrized: false
    }
    });
    console.log(req.body);
    const emails = req.body.list;
    const subject = req.body.subject;
    const text = req.body.text;
    const attachments = req.body.attachments;

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Workshop Facilitator" <s5harris@ucsd.edu>', // sender address
        to: emails, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments: attachments
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
})

module.exports = router;
