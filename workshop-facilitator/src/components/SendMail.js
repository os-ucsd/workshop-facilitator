import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

class SendMail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.id,
            expanded: false,
            subject: "",
            text: "",
        };
        this.collectEmails = this.collectEmails.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.setState({roomId: nextProps.id});
        }
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
    }

    send = () => {
        const id = this.state.roomId;

        let getMail = "http://localhost:5000/rooms/" + id + '/feedback';
        let getResources = "http://localhost:5000/rooms/" + id + "/resources";
        let resources;

        fetch(getResources, {
            mrthod: 'get',
        })
        .then((resp) => resp.json())
        .then((data) => resources = data)
        .then((err) => console.log("Error", err))

        fetch(getMail, {
            method: 'get',
        })
        .then((resp) => resp.json())
        .then((data) => this.collectEmails(data, getMail, resources))
        // if failure, log the error
        .catch((err) => console.log("Error", err));

        alert("Email Sent Subject: " + this.state.subject);
    }

    collectEmails(emails, getMail, resources) {
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
                path: resource.src
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
        .then((resp) => resp.json())
        .then((data) => console.log("Email sent"))
        .catch((err) => console.log("Error", err));
    }



    render() {
        return (
            <div>
                <Button onClick={this.expand}>Send Mail</Button>
                <br></br>
                <br></br>
                {this.state.expanded ? 
                <form noValidate autoComplete = "off" onChange = {this.handleChange}>
                    <TextField id="subject" label="Subject" variant="outlined" multiline></TextField>
                    <br></br>
                    <br></br>
                    <TextField id="text" label="Body" variant="outlined" multiline rows={5} rowsMax={30}></TextField>
                    <br></br>
                    <br></br>
                    <div>
                        <Button onClick={this.send} variant="contained" color="secondary">
                            Send
                        </Button>
                    </div>
                </form>
                : null}
            </div>
        );
    }
}

export default SendMail;