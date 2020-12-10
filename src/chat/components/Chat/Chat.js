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
            msgCame: false,
            moreMessages: true,
        }

    }
    setMsgCame = (bool) => {
        this.setState({msgCame: bool});   
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
                if (this.state.firstLoad == true){
                    this.setState({first_idx: this.state.first_idx + 3})
                    this.setState({second_idx: this.state.second_idx + 3})
                }
                this.setState({firstLoad: true})
            }else{
                this.setState({moreMessages: false});   
            }
            this.setState({messages: messages.concat(this.state.messages)})
        })
       
    }
    onMessageSubmit = (event) => {

        event.preventDefault();
    }
    onScrollBarChange = () => {
        if (document.getElementById('slider-container').scrollTop == 0 && this.state.moreMessages){
            this.getMessages();
            document.getElementById('slider-container').scrollTop = 200;
        }
  
    }

    componentDidMount() {
        this.scrollToBottom();
        this.getMessages();
        for (let i = 0; i < Object.values(this.state.messages).length; ++i){
            if (Object.values(this.state.messages)[i].sender_id != window.localStorage.getItem('id')){
                this.props.getUserId(Object.values(this.state.messages)[i].sender_id); 
            }
        }
        this.scrollToBottom();
        this.el.scrollIntoView({behavior:"smooth"});

    }
    componentDidUpdate(){
        //if (this.state.msgCame == true){
          //  this.scrollToBottom();
           // this.setMsgCame(false);
        //}
           
       // if (this.props.chatId != null && this.state.firstLoad != true){
       //     this.getMessages();
        //    this.setState({firstLoad:true})
      //  }
        
        if (this.state.chatId != this.props.chatId){
            this.setState({load: true})
            this.setState({messages: []})
            this.setState({first_idx: 0})
            this.setState({second_idx: 10})
            this.setState({chatId: this.props.chatId})
            this.getMessages();
        }
        //if (this.state.messages == [] && this.state.load == false){
         //   this.getMessages();
      //      this.setState({load: true})
       // }
    }
    scrollToBottom = () => {
        this.el.scrollIntoView({behavior:"smooth"});
    }
    renderMessages = (messages) => {
        let new_messages = [];
        new_messages.push(messages[0]);
        let found = false;
        for (let i = 1; i < messages.length; ++i){
            found = false;
            for (let j = 0; j < new_messages.length; ++j){
                if (messages[i].sent_time == new_messages[j].sent_time && messages[i].sender_id == new_messages[j].sender_id){
                    found = true   
                }
            }   
            if (found == true){
                continue;   
            }else{
                new_messages.push(messages[i])
            }
        }
        return new_messages[0] != undefined ? new_messages.map(message => message.sender_id == window.localStorage.getItem('id') ? <MessageTo message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> : <MessageFrom message={message.message} sender_id={message.sender_id} sent_time={message.sent_time}/> ) : null;                    
     }
    render(){
         const messages = this.renderMessages(this.state.messages.concat(this.props.messages))
        if (this.state.msgCame == true){
            this.scrollToBottom();
            this.setMsgCame(false);
        }
            return(
            
            <div className="chat-container">
                <div onScroll={this.onScrollBarChange}  className="chat" id="slider-container">
                        <div  className="messages-container" id="for-slider" >
                            {messages}
                             <div style={{ float:"left", clear: "both" }}
                                    ref={el => {this.el=el;}}>
                                
                            </div>
                        </div>
                             
                </div>
      
                <ChatInput setMsgCame={this.setMsgCame} sendMessage={this.props.sendMessage} onMessageSubmit={this.onMessageSubmit}/>
            </div>
        );
    }
}

export default Chat;
