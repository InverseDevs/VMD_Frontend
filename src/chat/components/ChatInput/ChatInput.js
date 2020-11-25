import React from 'react';
import './ChatInput.css';


class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typedMessage: "",
        }
    }   
    sendMsg = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.typedMessage);
    }
    render()
{    return(
        <div className="chat-input">
            <form className="chat-form" onSubmit={this.props.onMessageSubmit}>
                <div className="chat-input-container">
                    <textarea type="text" placeholder="Type text here..." onChange={(event) => {
                                               this.setState({typedMessage: event.target.value});
                                           }} className="msg-input"/>
                </div>
                <div className="send-btn">
                    <input onClick={this.sendMsg} type="submit" className="msg-send" value=""/>
                </div>
            </form>
        </div>
    );}
}


export default ChatInput;
