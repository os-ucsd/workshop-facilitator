import React from "react";

import "../styles/TopBar.css";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import Modal from '@material-ui/core/Modal';
import Modal from './Modal';

class TopBar extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen: false
        }
    }

    showModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    render(){
        const {room} = this.props;
        const {modalOpen} = this.state;
        let elements = ["View Codes", "Send Followup", "Close Room", "View Attendees"];
        let callbacks = [];

        return(
            <div className="top-bar">
            {
                room ? 
                    <div className="room-name-container">
                        <h3 className="room-name">{room.name}</h3>
                        <p className="join-code">{room.joinCode}</p>
                        <div className="options-container">
                            <MoreHorizIcon className="options-icon" fontSize="large" onClick={modalOpen ? this.closeModal : this.showModal}/>
                        </div>

                        <Modal elements={elements} callbacks={callbacks} isOpened={modalOpen} closeModal={this.closeModal} />
                    </div>
                : null
            }
            </div>
        )
    }
}

export default TopBar;