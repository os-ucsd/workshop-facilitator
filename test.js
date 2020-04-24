class BtnExample extends React.Component{
    constructor(){
        super();
        //this.btnClick = this.btnClick.bind(this);
        this.state = {asdf: "asdf"}
    }

    /*
    btnClick(){
        alert("you clicked me");
        this.state.asdf
    }
    */

    btnClick = () => {
        alert("you clicked me");
        this.state.asf
    }

    render(){
        return(
            <button onClick={this.btnClick}>Click</button>
        );
    }
}

