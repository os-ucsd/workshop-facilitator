import React from "react";

import "../styles/TopBar.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class TopBar extends React.Component{
    render(){
        const {room} = this.props;
        return(
            <div className="top-bar">
            {
                room ? 
                    <div className="room-name-container">
                        <h3 className="room-name">{room.name}</h3>
                        <p className="join-code">{room.joinCode}</p>
                        <div className="options-container">
                            <MoreHorizIcon className="options-icon" fontSize="large"/>
                        </div>
                    </div>
                : null
            }
            </div>
        )
    }
}

export default TopBar;