import React from 'react';
import './ChatInput.css';
import SockJsClient from 'react-stomp';
import chatAPI from './chatApi';

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
    onInputChange = (e) => {
        this.setState({message: e.target.value})
    }
    setName = (name) => {
        console.log(name);
        this.setState({name: name});
    };

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            message: this.state.typedMessage
        }));
    };
    onConnected = () => {
        console.log("Connected!!")
      }
    
      onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        this.setMessages(this.state.messages.concat(msg));
      }
    
      onSendMessage = (msgText) => {
        chatAPI.sendMessage(this.state.name, msgText).then(res => {
          console.log('Sent', res);
        }).catch(err => {
          console.log('Error Occured while sending message to api');
        })
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
                    <input onClick={this.sendMessage} type="submit" className="msg-send" value=""/>
                </div>
            </form>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/user']}
              onConnect={this.onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            />
        </div>
    );}
}


export default ChatInput;