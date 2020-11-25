import React from 'react';
import './ChatWindow.css';
import TabList from '../TabList/TabList';
import ChatInfo from '../ChatInfo/ChatInfo';
import Chat from '../Chat/Chat';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'https://inversedevs.herokuapp.com/websocket-chat';

class ChatWindow extends React.Component{
    constructor(props){
        super(props);
    }
    onConnected = () => {
        console.log("Connected!!")
      }
    
      onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        this.setMessages(this.state.messages.concat(msg));
      }
      sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            message: msg
        }));
    };
    render(){
    return(
        <div className="chat-window">
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/user']}
              ref={ (client) => { this.clientRef = client }}
              onConnect={this.onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            />
            <TabList tabs={this.props.tabs} closeTab={this.props.closeTab}/>
            <ChatInfo />
            <Chat sendMessage={this.sendMessage}/>
        </div>
    );
}
}

export default ChatWindow;
