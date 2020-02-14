import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Polls from "../components/Polls";

class Host extends React.Component {
    constructor() {
        super();
        this.state = {}
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