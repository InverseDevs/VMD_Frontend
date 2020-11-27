import React from 'react';
import './Tab.css';
import close from './close.png';
class Tab extends React.Component {
    constructor(props) {
        super(props);
    }
    close = () => {
        this.props.closeTab(this.props.name);
    }
    render(){
    return(
        <div className="tab">
                <p className="chat-name">{this.props.name}</p>
                <div onClick={this.close} className="close-div">
                    <img src={close} className="close-icon" />
                </div>
        </div>
    );
}
}


export default Tab;
