import React from "react";

class Resources extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <h2>Resources</h2>
                <ul>
                    <li>Resource 1</li>
                    <li>Resource 2</li>
                    <li>Resource 3</li>
                </ul>
            </div>
        )
    }
}

export default Resources;