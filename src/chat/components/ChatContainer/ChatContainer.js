import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Chats from '../Chats/Chats';


class ChatContainer extends React.Component {
    state = {
        tabs_number: 0,
        groups_number: 0,
        show: false,
        chatInfo: {},
    };
    getInfo = (chatName, chatImg, chatId) => {
        this.setState({chatInfo: {'name':chatName, 'img':chatImg, 'id':chatId}})
    }
    getShow = (state) => {
        this.setState({show: state})
    }
    addTab = () => {
        this.setState(({tabs_number}) => ({
            tabs_number: tabs_number+1,
        }))};
    closeTab = () => {
        this.setState(({tabs_number}) => ({
            tabs_number: tabs_number-1,
        }))
    };

    render() {
        return(
        <div className="chat-container">
        <Chats getInfo={this.getInfo} show={this.state.show} groups={this.state.groups_number} getShow={this.getShow} addTab={this.addTab}/>
        <ChatWindow chatInfo={this.state.chatInfo} getShow={this.getShow} show={this.state.show} tabs={this.state.tabs_number} closeTab={this.closeTab}/>
        </div>
    );}
}

export default ChatContainer;