import React from 'react';
import './Chat.css';
import MessageFrom from '../MessageFrom/MessageFrom';
import MessageTo from '../MessageTo/MessageTo';
import ChatInput from '../ChatInput/ChatInput';

class Chat extends React.Component {
    constructor(props){
        super(props);
    }
    onMessageSubmit = (event) => {

        event.preventDefault();
    }

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate(){
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        this.el.scrollIntoView({behavior:"smooth"});
    }
    renderMessages = (messages) => {
        return Object.values(messages).map(message => message.sender_id == window.localStorage.getItem('id') ? <MessageTo message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> : <MessageFrom message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> )
    }
    render(){
        const messages = this.renderMessages(this.props.messages);
        this.top.scrollTop == 0 ? alert('yes') : alert('no')
        return(
            
            <div className="chat-container">
                <div className="chat" id="slider-container">
                    
                        <div className="messages-container" id="for-slider" >
                                           <div style={{ float:"left", clear: "both" }}
                            ref={top => {this.top=top;}}>
                                
                            </div>
                            {messages}
                            <div style={{ float:"left", clear: "both" }}
                            ref={el => {this.el=el;}}>
                                
                            </div>
                        </div>
                </div>
                <ChatInput sendMessage={this.props.sendMessage} onMessageSubmit={this.onMessageSubmit}/>
            </div>
        );
    }
}

export default Chat;
