import React from 'react';
import './ChatWindow.css';
import TabList from '../TabList/TabList';
import ChatInfo from '../ChatInfo/ChatInfo';
import Chat from '../Chat/Chat';
import SockJsClient from 'react-stomp';

import ChatAddModal from '../ChatAddModal/ChatAddModal';
import ChatAddForm from '../ChatAddForm/ChatAddForm';
const SOCKET_URL = 'https://inversedevs.herokuapp.com/websocket-chat';


class ChatWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: this.props.messages,

            show: false,
        }
    }
   

    onConnected = () => {
        console.log("Connected!!")
      }
    
      onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        let messages = this.state.messages;
        messages.push(msg);
        this.setState({messages: messages});
      }
      sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({chat_id: this.props.chatInfo.id, sender_id:window.localStorage.getItem('id'),
            message: msg
        }));
    };
    render(){
    return(
        
        <div className="chat-window">
            { <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/user']}
              ref={ (client) => { this.clientRef = client }}
              onConnect={this.onConnected}
              onDisconnect={console.log('disconnected!')}
              autoReconnect={true}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            /> }
            <TabList chatInfo={this.props.chatInfo} getMessages={this.props.getMessages} getInfo={this.props.getInfo} tabs={this.props.tabs} closeTab={this.props.closeTab}/>
            <ChatInfo chatInfo={this.props.chatInfo}/>

            <ChatAddModal getShow={this.props.getShow} show={this.props.show} >
                    <ChatAddForm getShow={this.props.getShow}/>
            </ChatAddModal>
            <Chat sendMessage={this.sendMessage} messages={this.state.messages}/>
        </div>
    );
}
}

export default ChatWindow;
