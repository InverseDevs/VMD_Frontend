import React from 'react';
import './ChatInfo.css';

class ChatInfo extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        if (this.props.chatInfo != null) {
        return (
            <div className="chat-info">
                <div className={this.props.chatInfo.img != '' ? "chat-img-exist" : "chat-img"}>{this.props.chatInfo.img != ''? <img src={this.props.chatInfo.img} alt="chat-img" className="chat-img-icon"/> : null}</div>
                <p className="chat-info-name">{this.props.chatInfo.name != '' ? this.props.chatInfo.name : 'chatName'}</p>
            </div>
        )
    }
    else{ return (
        <div className="chat-info">
    </div>)
    }
}
}
export default ChatInfo;
