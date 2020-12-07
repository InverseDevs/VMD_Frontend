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

            show: false,
        }
    }
   

    onConnected = () => {
        console.log("Connected!!")
      }
    
      onMessageReceived = (msg) => {
        let arr = [];
        arr.push(msg);
        for (let i = 0; i < this.props.messages.length;++i){
            arr.push(messages[i]);   
        }
        this.props.getMessages(arr);
      }
      sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({chat_id: this.props.chatInfo.id, sender_id:window.localStorage.getItem('id'),
            message: msg
        }));
    };
    render(){
        if (this.props.chatInfo.id != null){ 
        return (
        <div className="chat-window">
            { <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/user']}
              ref={ (client) => { this.clientRef = client }}
            
              autoReconnect={true}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            /> }
            <TabList chatInfo={this.props.chatInfo} getMessages={this.props.getMessages} getInfo={this.props.getInfo} tabs={this.props.tabs} closeTab={this.props.closeTab}/>
            <ChatInfo chatInfo={this.props.chatInfo}/>

            <ChatAddModal getShow={this.props.getShow} show={this.props.show} >
                    <ChatAddForm getShow={this.props.getShow}/>
            </ChatAddModal>
            <Chat chatId={this.props.chatInfo.id !== null ? this.props.chatInfo.id : null} sendMessage={this.sendMessage} messages={this.props.messages}/>
        </div>
    );
            }
            else{
                return(
                        <div className="preload-container">
                            <ChatAddModal getShow={this.props.getShow} show={this.props.show} >
                                <ChatAddForm getShow={this.props.getShow}/>
                            </ChatAddModal>
                            <TabList chatInfo={this.props.chatInfo} getMessages={this.props.getMessages} getInfo={this.props.getInfo} tabs={this.props.tabs} closeTab={this.props.closeTab}/>
                            <div className="preload-message">
                                Выберите чат
                            </div>
                        </div>

                )
            }
}
}

export default ChatWindow;
