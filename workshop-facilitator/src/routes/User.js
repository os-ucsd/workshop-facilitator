import React from "react";
import SplitPane from 'react-split-pane';
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Polls from "../components/Polls";
import io_client from "socket.io-client"
import "../styles/User.css";



let socket;

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            // should be the same as the port you're using for server
            ENDPOINT: "localhost:5000",
            room: null,
            slowerSent: false
        }
    }

    componentDidMount(){
        // make connection between this client and the server (which is active on port 5000)
        socket = io_client(this.state.ENDPOINT);

        socket.on("slowerReset", () =>{
            console.log("host noticed you!");
            this.setState({slowerSent: false});
        })

         /* if a new user joins, publish the already published question if any
         socket.on("publishNewUser", data => {
             alert(data);
         })*/


        //get fetches the room by ID if the ID was sent,saves in state
        if(this.props.location.state != null){
            console.log("Here is the ID: " + this.props.location.state.roomID);

             // join the socket room for this workshop room
            const roomID = this.props.location.state.roomID;
            socket.emit("join", {name: roomID});

            socket.on("welcome", data => console.log(data));

            //this.setState( {roomID: this.props.location.state.roomID} );
            //console.log("Here is the ID that was passed: " +  this.state.roomID);
            let getString = "http://localhost:5000/rooms/" + this.props.location.state.roomID;
            console.log("getString: " + getString);

            // join the socket room with the given room id
            socket.emit("join", {name: this.props.location.state.roomID});

            fetch(getString, {
                method: 'get',
            })
            .then((resp) => resp.json())
            // if success and data was sent back, log the data
            .then((data) => this.setState({ room: data}) )
            // if failure, log the error
            .catch((err) => console.log("Error", err));


        }

    }

    postQuestion = (e) => {
        e.preventDefault();
        const newQst = this.state.question;
        console.log(newQst);
        // emit question for all users to see
        if (newQst) socket.emit("question", {question: newQst});

        let questionData = {"question" : this.state.question}
        let getRoom = 'http://localhost:5000/rooms/' + this.state.room._id + '/questions/add';
        console.log('getRoom: ' + getRoom);

        // join the socket room with the given room
        socket.emit("join", {name: this.props.location.state.roomId});

        fetch(getRoom, {
            // send as a POST request with new room information in body,
            //POST fetch("the API route that adds a new question, {method: "POST", body:
            //{question data to pass in}})
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(questionData)
        })
        //using .text() instead of .json to avoid errors
        .then((resp) => resp.json())
        // if success and data was sent back, log the data
        .then((data) => handleSuccess(data))
        // if failure, log the error
        .catch((err) => console.log("Error", err));

        // clear chatbox
        this.setState({question: ""})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSlower = () => {
        socket.emit("slower", {data:"nothing"});
        this.setState({slowerSent: true});
        console.log("slower sent is:  " + this.state.slowerSent);
    }

    render() {
        if (!socket) return null;

        return (
            <div>
                {(this.state.room != null) ?
                    <div>
                        <h3> User code is: {this.state.room.joinCode} </h3>
                    </div>
                    :
                    <h3> No room FOR TESTING ONLY </h3>

                }


                {(this.state.slowerSent) ?
                    <Button variant = "outlined" disabled > Message Sent to Host </Button>
                    :
                    <Button variant = "outlined" onClick={this.handleSlower}> Go Slower </Button>
                }


                <SplitPane
                    split="vertical"
                    minSize="90%"
                    maxSize={-200}
                    defaultSize="85%"
                    className="primary"
                >
                    <SplitPane
                        split="horizontal"
                        minSize={200}
                        maxSize={-200}
                        defaultSize="40%"
                    >
                        <div>
                            <Polls isHost={false} socket={socket} roomID={this.props.location.state.roomID}/>
                        </div>
                        <div>
                            <Questions />
                                <form noValidate autoComplete = "off" onSubmit = {this.postQuestion} onChange = {this.handleChange}>
                                    <Grid container>
                                    <TextField id="question" fullWidth="true" label="Enter a Question" variant="outlined">Enter Question</TextField>
                                    <Button type="submit" onClick={this.postQuestion}>></Button>
                                    </Grid>
                                </form>
                        </div>
                    </SplitPane>
                    <div>

                        {(this.state.room != null) ?
                            <div>
                                <h3> User code is: {this.state.room.joinCode} </h3>
                            </div>
                            :
                            <h3> No room FOR TESTING ONLY </h3>

                        }
                        <Resources roomID={this.props.location.state.roomID}/>
                    </div>
                </SplitPane>
            </div>
        )
    }
}

function handleSuccess(data){
    console.log("Success. here is the resp.() dump: ", data);
}


export default User;
