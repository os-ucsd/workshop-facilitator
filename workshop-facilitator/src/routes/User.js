import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SplitPane from 'react-split-pane';
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Polls from "../components/Polls";
import io_client from "socket.io-client"
import "../styles/User.css";



let socket;

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            collapsed: false,
            // should be the same as the port you're using for server
            ENDPOINT: "localhost:5000",
        }
    }

    componentDidMount(){
        // make connection between this client and the server (which is active on port 5000)
        socket = io_client(this.state.ENDPOINT);
    }

    postQuestion = (e) => {
        e.preventDefault();
        const newQst = this.state.question;
        console.log(newQst);
        // emit question for all users to see
        if (newQst) socket.emit("question", {question: newQst});

        // clear chatbox
        this.setState({question: ""})
    }

    collapse = () => {
        this.setState ({
            collapsed: !(this.state.collapsed),
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        // when pass in newly created room from Create.js/Join.js will be in this.props.location.state
        // if we pass props through this.props.history.push
        let roomState = null;
        if(this.props.location.state != null){
            roomState = this.props.location.state.room;
            console.log("here is the room sent from Join/Create Page: " + roomState);
            console.log("Host code: " + roomState.hostCode);

        }

        return (
            <div>
                {(roomState != null) ?
                    <div>
                        <h3> User code is: {roomState.joinCode} </h3>
                    </div>
                    :
                    <h3> No room FOR TESTING ONLY </h3>

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
                        defaultSize="50%"
                    >
                        <div>
                            <Polls isHost={false}/>
                        </div>
                        <div>
                            <Questions />
                        </div>
                    </SplitPane>
                    <div>
                        <Resources />
                    </div>
                </SplitPane>
            </div>
        )
    }
}

export default User;
