import React from 'react';
import './ChatInput.css';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'https://inversedevs.herokuapp.com/websocket-chat';
class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typedMessage: "",
            name: ""
        }
    }

    sendMessage = () => {
        let message = this.state.typedMessage;
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            message: message
        }));
    };
    onConnected = () => {
        console.log("Connected!!")
      }
    
      onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        this.setMessages(this.state.messages.concat(msg));
      }

    
    render()
{    return(
        <div className="chat-input">
             <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/user']}
              onConnect={this.onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            />
            <form className="chat-form" onSubmit={this.props.onMessageSubmit}>
                <div className="chat-input-container">
                    <textarea type="text" placeholder="Type text here..." onChange={(event) => {
                                               this.setState({typedMessage: event.target.value});
                                           }} className="msg-input"/>
                </div>
                <div className="send-btn">
                    <input onClick={this.sendMessage} type="submit" className="msg-send" value=""/>
                </div>
            </form>
           
        </div>
    );}
}


export default ChatInput;
