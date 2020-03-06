import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
        return (
            <div className="Layout">      
                <Grid container>
                    <div>                      
                            <Paper sacing={0} style={{height: "35vh" , width: this.state.collapsed ? "95vw" : "78vw"}}>
                                <Polls/>
                            </Paper>
                        <Grid item xs={8} >
                            <Paper style={{height: "58vh" , width: this.state.collapsed ? "95vw" : "78vw"}}>
                                <Questions/>
                            </Paper>
                        </Grid>
                        <Paper style={{height: "6vh" , width: this.state.collapsed ? "95vw" : "78vw"}}>
                            <Grid container>
                                <form style={{width: this.state.collapsed ? "89vw" : "72vw"}} noValidate autoComplete = "off" onSubmit = {this.postQuestion} onChange = {this.handleChange}>
                                    <TextField fullWidth placeholder="Ask a Question" id = "question" label = "Question" variant = "outlined" />
                                </form>
                                <Button style={{height: "5vh", width: "6vw"}} onClick={this.postQuestion} variant = "containted">
                                    Submit
                                </Button>
                            </Grid>
                        </Paper>
                    </div>
                    
                    <div>
                        <Grid item xs={4}>
                            <Paper style={{height: this.state.collapsed ? "0vh" : "100vh", width: this.state.collapsed ? "0vh" : "21vw"}}>
                                <Grid container direction="row">                                                              
                                    <Grid item xs={15}>
                                        <Button style={{height: this.state.collapsed ? "100vh" : "100vh", width: "3vw"}} onClick={this.collapse} variant="outlined"> {this.state.collapsed ? "<" : ">"} </Button>
                                    </Grid>
                                    <Grid item xs={15}>                                   
                                        {this.state.collapsed ? false : <Resources />}                                   
                                    </Grid>    
                                </Grid>
                            </Paper>
                        </Grid>
                    </div>          
                </Grid>         
            </div>
        )
    }
}

export default User;