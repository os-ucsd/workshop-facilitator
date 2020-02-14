import React from "react";

class Polls extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <h2>Polls</h2>
                <ul>
                    Question 1:
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </ul>
            </div>
        )
    }
}

export default Polls;