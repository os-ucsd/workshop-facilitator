/*
Holds the API routes having to deal with the workshop rooms
*/
const express = require('express');
const router = express.Router();

/*
@route GET /rooms/
@desc Gets a list of all current workshop rooms
*/
router.route('/').get((req, res) => {
    // database query
})

/*
@route POST /rooms/create
@desc Creates a new workshop room
*/
router.route('/create').post((req, res) => {
    // database query
})

/*
@route GET /rooms/:id
@desc Gets a specific room with the given ID
*/
router.route('/:id').get((req, res) => {
    const roomId = req.params.id;

    // database query
})

/*
@route GET /rooms/:id/questions/
@desc Gets all questions in a given room
*/
router.route('/:id/questions/').get((req, res) => {

})

/*
@route POST /rooms/questions/add
@desc Adds a new question to the specific workshop room
*/
router.route('/:id/questions/add').post((req, res) => {

})

/*
@route GET /rooms/:roomId/questions/:qId
@desc Gets a specific question in a specific room
*/
router.route('/:roomId/questions/:qId').get((req, res) => {

})

/*
@route GET /rooms/:id/clickers/
@desc Gets all clicker questions in a specific room
*/
router.route('/:id/clickers/').get((req, res) => {

})

/*
@route POST /rooms/:id/clickers/add
@desc Adds a clicker question to a specific workshop room
*/
router.route('/:id/clickers/add').post((req, res) => {

})

/*
@route GET /rooms/:roomId/clickers/:cId
@desc Gets a specific clicker question from a specific room
*/
router.route('/:roomId/clickers/:cId').get((req, res) => {

})

module.exports = router;