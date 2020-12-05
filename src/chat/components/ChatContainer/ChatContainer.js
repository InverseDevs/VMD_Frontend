import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Chats from '../Chats/Chats';


class ChatContainer extends React.Component {
    state = {
        tabs: window.localStorage.getItem('tabs') != "" ? JSON.parse(window.localStorage.getItem('tabs')): [],
        show: false,
        chatInfo: {'name': null, 'img':null, 'id': null},
        messages: [],
    };
    getMessages = (messages) => {
        this.setState({messages: messages});
    }
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
        window.localStorage.setItem('tabs', JSON.stringify(this.state.tabs));   
    };
    addTab = (name,avatar,id) => {
        let tabs = this.state.tabs;
        let tab = {'name' : name, 'avatar':avatar,'id':id};
        let check = true;
        for (let i = 0; i < tabs.length; ++i)
        {
            if (tabs[i].name == name){
               check =false;   
            }
        }
        if (check == true){
         
            tabs.push(tab)   
        }
        this.setState({tabs: tabs});
        window.localStorage.setItem('tabs',JSON.stringify(this.state.tabs));   

    }
    render() {
        console.log(this.state.tabs)
        return(
        <div className="chat-container">
        <Chats getInfo={this.getInfo} getMessages={this.getMessages} show={this.state.show}  getShow={this.getShow} addTab={this.addTab}/>
        <ChatWindow messages={this.state.messages} getMessages={this.getMessages} chatInfo={this.state.chatInfo} getInfo={this.getInfo} getShow={this.getShow} show={this.state.show} tabs={this.state.tabs} closeTab={this.closeTab}/>
        </div>
    );}
}

export default ChatContainer;
