import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Polls from "../components/Polls";
import io from "socket.io-client";

let socket;

class Host extends React.Component {
    constructor() {
        super();
        this.state = {
            // should be the same as the port you're using for server
            ENDPOINT: "localhost:5000",
        }
    }

    componentDidMount(){
        /*
        make the connection to the socket (when user visits this component, 
        connection event will be emitted because of this connection)

        now, there exists a websocket between this client and our server, so
        we can emit events to our server 
        */
        socket = io(this.state.ENDPOINT);

        socket.on("test", () => {
            console.log("test event received!");
        })
    }

    render() {
        return (
            <div style={{display: "flex", flex:"1"}}>
                <Grid container >
                    <div>
                        <Grid item xs={8}>
                        <Paper style={{height: "50vh" , width: "78vw"}}>
                            <Polls/>
                        </Paper>
                        </Grid>
                        <Grid item xs={8} >
                        <Paper style={{height: "50vh" , width: "78vw"}}>
                            <Questions/>
                        </Paper>
                        </Grid>
                    </div>
                    
                    <div>
                        <Grid item xs={4}>
                        <Paper style={{height: "100vh", width: "20vw"}}>
                            <Resources />
                        </Paper>
                        </Grid>
                    </div>
                </Grid>

            </div>
        )
    }
}

export default Host;