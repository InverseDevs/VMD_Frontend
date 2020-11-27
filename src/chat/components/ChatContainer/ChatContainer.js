import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Chats from '../Chats/Chats';


class ChatContainer extends React.Component {
    state = {
        tabs: [],
        groups_number: 0,
        show: false,
        chatInfo: null,
    };
    getInfo = (chatName, chatImg, chatId) => {
        this.setState({chatInfo: {'name':chatName, 'img':chatImg, 'id':chatId}})
    }
    getShow = (state) => {
        this.setState({show: state})
    }
    closeTab = (name) => {
        let tabs = this.state.tabs;
        tabs = tabs.filter(tab => tab.name != name);
        this.setState({tabs: tabs})
    };
    addTab = (name) => {
        let tabs = this.state.tabs;
        let tab = {'name' : name};
        tabs.push(tab);
        this.setState({tabs: tabs});
    }

    render() {
        return(
        <div className="chat-container">
        <Chats getInfo={this.getInfo} show={this.state.show}  getShow={this.getShow} addTab={this.addTab}/>
        <ChatWindow chatInfo={this.state.chatInfo} getShow={this.getShow} show={this.state.show} tabs={this.state.tabs} closeTab={this.closeTab}/>
        </div>
    );}
}

export default ChatContainer;
