import React from 'react';
//import nodemailer from 'nodemailer';
import Button from '@material-ui/core/Button';

const nodemailer = require("nodemailer");

class SendMail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.id,
            emails: []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.setState({roomId: nextProps.id});
        }
    }

    send = () => {
        const id = this.state.roomId;
        console.log(id);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '',
            pass: ''
          }
        });

        let getString = "http://localhost:5000/rooms/" + id + '/feedback';
        let emailList = [];

        fetch(getString, {
            method: 'get',
        })
        .then((resp) => resp.json())
        .then((data) =>  {
            for(let i = 0; i < data.length; i++) {
                console.log(data[i]);
                emailList.push(data[i]);
            }
        })
        // if failure, log the error
        .catch((err) => console.log("Error", err));

        console.log('email state: ' + emailList);

        // send mail with defined transport object
        let mailOptions = {
            from: '"Workshop Facilitator" <>', // sender address
            to: emailList, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
          };
      }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.send} type="submit" variant="contained" color="secondary">
                        Send Mail
                    </Button>
                </div>
            </div>
        );
    }
}


export default SendMail;