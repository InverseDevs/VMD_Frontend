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

    render(){
        return(
            
            <div className="chat-container">
                <div className="chat" id="slider-container">
                    
                        <div className="messages-container" id="for-slider" >
                            
                            <div style={{ float:"left", clear: "both" }}
                            ref={el => {this.el=el;}}>
                            </div>
                        </div>
                </div>
                <ChatInput onMessageSubmit={this.onMessageSubmit}/>
            </div>
        );
    }
}

export default Chat;