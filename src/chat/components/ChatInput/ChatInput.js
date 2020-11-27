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
        this.setState({typedMessage: ''})
        document.getElementById('message-area').value = '';
    }
    handleKeyPress = (event) => {
  if(event.key === 'Enter'){
    this.sendMsg(event);
         }
    }   
    render()
{    return(
        <div className="chat-input">
            <form className="chat-form" onSubmit={this.props.onMessageSubmit}>
                <div className="chat-input-container">
                    <textarea type="text" id="message-area" placeholder="Type text here..." onChange={(event) => {
                                               this.setState({typedMessage: event.target.value});
                                           }} className="msg-input" autofocus/>
                </div>
                <div className="send-btn">
                    <input onClick={this.sendMsg} onKeyPress={this.handleKeyPress} type="submit" className="msg-send" value=""/>
                </div>
            </form>
        </div>
    );}
}


export default ChatInput;
