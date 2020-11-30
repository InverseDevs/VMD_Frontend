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
            second_idx : 10,
            messages: [],
            firstLoad: false,
            chatId: null,
            load: false,
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
        let messages = []
        await this.getData(`https://inversedevs.herokuapp.com/chat/messages/${this.props.chatId}`, {first_idx : this.state.first_idx, last_idx: this.state.second_idx})
        .then(data => {
            if (data.status != 'no messages'){              
                for (let i in data.messages){

                    messages.push(data.messages[i])   
                }
                this.setState({first_idx: this.state.first_idx + 10})
                this.setState({second_idx: this.state.second_idx + 10})
            }
            this.setState({messages: this.state.messages.concat(messages)})
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
        
        if (this.state.chatId != this.props.chatId){
            this.setState({load: true})
            this.setState({messages: []})
            this.setState({first_idx: 0})
            this.setState({second_idx: 10})
            this.setState({chatId: this.props.chatId})
            this.getMessages();
        }
        if (this.state.messages == [] && this.state.load == false){
            this.getMessages();
            this.setState({load: true})
        }
    }
    scrollToBottom = () => {
        this.el.scrollIntoView({behavior:"smooth"});
    }
    renderMessages = (messages) => {
        return messages.map(message => message.sender_id == window.localStorage.getItem('id') ? <MessageTo message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> : <MessageFrom message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> )
    }
    render(){
         const mes = null;
         const messages = this.renderMessages(this.state.messages.concat(this.props.messages))
            return(
            
            <div className="chat-container">
                <div onScroll={this.onScrollBarChange} ref={this.top} className="chat" id="slider-container">
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
