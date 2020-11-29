import React from 'react';
import './Chat.css';
import MessageFrom from '../MessageFrom/MessageFrom';
import MessageTo from '../MessageTo/MessageTo';
import ChatInput from '../ChatInput/ChatInput';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            first_idx : 0,
            second_idx : 50,
            messages: [],
        }

    }
    getData = async (url,data) => {
        const res = await fetch(url, {
            method: 'GET',
            body: JSON.stringify(data),
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
    getMessages = async () => {
        let messages = this.state.messages
        await this.getData(`https://inversedevs.herokuapp.com/chats/${this.props.chatId}`, {first_idx : this.state.first_idx, last_idx: this.state.second_idx})
        .then(data => {
            messages = messages.concat(data)
            this.setState({messages: messages})
            this.setState({first_idx: this.state.first_idx + 50})
            this.setState({second_idx: this.state.second_idx + 50})
            console.log(this.state.messages)
        })
       
    }
    onMessageSubmit = (event) => {

        event.preventDefault();
    }
    onScrollBarChange = () => {
        if (this.top.scrollTop == 0){
            this.getMessages();
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        this.getMessages();
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
        const messages = this.renderMessages(this.state.messages.concat(this.props.messages));
        return(
            
            <div className="chat-container">
                <div onChange={this.onScrollBarChange} ref={this.top} className="chat" id="slider-container">
                        <div  className="messages-container" id="for-slider" >
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
