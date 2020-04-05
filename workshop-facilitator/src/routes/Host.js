import React from "react";
import SplitPane from 'react-split-pane';
import '../styles/Host.css';
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
        // when pass in newly created room from Create.js/Join.js will be in this.props.location.state
        // if we pass props through this.props.history.push
        const roomState = this.props.location.state.room;
        console.log("here is the room sent from Join/Create Page: " + roomState);
        console.log("Host code: " + roomState.hostCode);

        return (
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
                        <Polls isHost={true}/>
                    </div>
                    <div>
                        <Questions />
                    </div>
                </SplitPane>
                <div>
                    <Resources />
                </div>
            </SplitPane>

        )
    }
}

export default Host;
