import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import "../styles/SendMail.css";

class SendMail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.id,
            expanded: false,
            subject: "",
            text: "",
            resources: null,
            selectedResources: [],
        };
        this.checkEmails = this.checkEmails.bind(this);

    }

    componentDidMount() {
        let reqURL = "http://localhost:5000/rooms/" + this.props.id + "/resources"
        fetch(reqURL)
            .then(res => res.json())
            .then(resources => this.setState({resources}))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.setState({roomId: nextProps.id});
        }
    }

    addResource = (e) => {
        for(const resource of this.state.resources) {
            if(e.target.id === resource.src) {
                let newArr = this.state.selectedResources;
                let removed = false;
                for(const elem of newArr) {
                    if(elem === resource) {
                        removed = true;
                        let i = 0;
                        while (i < newArr.length) {
                            if(newArr[i] === elem) {
                                newArr.splice(i, 1);
                            } else {
                                ++i;
                            }
                        }
                    }
                }
                if(!removed) {
                    newArr.push(resource);
                    this.setState({
                        selectedResources: newArr,
                    })
                }
            }
        }
        console.log(this.state.selectedResources);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    expand = () => {
        this.setState({
            expanded: (!(this.state.expanded))
        })
        this.setState({
            selectedResources: [],
        })
    }

    send = () => {
        let getMail = "http://localhost:5000/rooms/" + this.state.roomId + '/feedback';
        fetch(getMail, {
            method: 'get',
        })
        .then((resp) => resp.json())
        .then((data) => this.checkEmails(data, getMail, this.state.selectedResources))
        // if failure, log the error
        .catch((err) => console.log("Error", err));
    }

    checkEmails(emails, getMail, resources) {
        let emailList = "";
        let attachments = [];
        for(const email of emails) {
            if(email !== "" && emailList === "") {
                emailList = email;
            }
            else if(email !== "") {
                emailList = emailList + ', ' + email;
            }
        }
        for(const resource of resources) {
            attachments.push({
                filename: resource.title, 
                path: resource.src,
            })
        }
        console.log('emails: ' + emailList);
        let postString = getMail + '/send';
        let emailData = {"list": emailList, "subject": this.state.subject, "text": this.state.text, "attachments": attachments};
        
        fetch(postString, {
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(emailData)
        })
        .then((resp) => console.log("Email sent"))
        .catch((err) => console.log("Error", err));
        
        alert("Email Sent; Subject: " + this.state.subject);
    }



    render() {
        return (
            <div>
                <Button onClick={this.expand}>
                    Send Mail 
                </Button>
                <br></br>
                <br></br>
                {this.state.expanded ? 
                <form noValidate autoComplete = "off" onChange = {this.handleChange}>
                    <ExpansionPanel>
                    <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Add Attachments</Typography>
                        <AttachmentIcon></AttachmentIcon>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="Attachments">
                                {this.state.resources ? this.state.resources.map(resource =>
                                <div>
                                    {resource.title}
                                    <Checkbox id={resource.src} color="primary" onClick={this.addResource}></Checkbox>
                                </div>
                                ) : null}
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br></br>
                    <br></br>
                    <TextField id="subject" label="Subject" variant="outlined" multiline></TextField>
                    <br></br>
                    <br></br>
                    <TextField id="text" label="Body" variant="outlined" multiline rows={5} rowsMax={30}></TextField>
                    <br></br>
                    <br></br>
                    <div>
                        <Button onClick={this.send} variant="contained" color="primary">
                            Send
                            <SendIcon/>
                        </Button>
                    </div>
                </form>
                : null}
            </div>
        );
    }
}

export default SendMail;