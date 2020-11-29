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
            firstLoad: false,
        }

    }
    getData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
     getMessages = async () => {
        let messages = this.state.messages
        
        await this.getData(`https://inversedevs.herokuapp.com/chat/messages/${this.props.chatId}`, {first_idx : this.state.first_idx, last_idx: this.state.second_idx})
        .then(data => {
            if (data.status != 'no messages'){
                messages = messages.concat(data.messages)
                this.setState({first_idx: this.state.first_idx + 50})
                this.setState({second_idx: this.state.second_idx + 50})
            }
            this.setState({messages: messages})
            
        })
       
    }
    onMessageSubmit = (event) => {

        event.preventDefault();
    }
    onScrollBarChange = () => {
        if (document.getElementById('slider-container').scrollTop == 0){
            this.getMessages();
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        this.getMessages();
    }
    componentDidUpdate(){
        this.scrollToBottom()
        if (this.props.chatId != null && this.state.firstLoad != true){
            this.getMessages();
            this.setState({firstLoad:true})
        }
    }
    scrollToBottom = () => {
        this.el.scrollIntoView({behavior:"smooth"});
    }
    renderMessages = (messages) => {
        return messages.map(message => message.sender_id == window.localStorage.getItem('id') ? <MessageTo message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> : <MessageFrom message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> )
    }
    render(){
         console.log('state',[...Object.values(this.state.messages)[0]])
         const messages = null
        //const messages = this.state.messages != [] ? this.props.messages != null ? this.renderMessages(Object.values(this.state.messages)[0].concat(this.props.messages[0])) : this.renderMessages(Object.values(this.state.messages)[0]) : null;
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
