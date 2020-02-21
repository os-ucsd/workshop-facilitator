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
        return (
            <SplitPane
                split="vertical"
                minSize={1000}
                maxSize={-200}
                defaultSize={1300}
                className="primary"
            >
                <SplitPane
                    split="horizontal"
                    minSize={200}
                    maxSize={-300}
                    defaultSize={400}
                >
                    <div>
                        <Polls />
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