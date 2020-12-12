import React from 'react';
import './ChatInput.css';


class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typedMessage: "",
            validated: true,
        }
    }   
    sendMsg = (e) => {
        e.preventDefault();
        if (this.state.typedMessage != ''){
            
        this.props.sendMessage(this.state.typedMessage);
            this.props.setMsgCame(true)
        }
        this.setState({typedMessage: ''})
        document.getElementById('message-area').value = '';
    }
    handleKeyPress = (event) => {
  if(event.key === 'Enter'){
    this.sendMsg(event);
         }
    }   
    render()
{    return(
        <div className="chat-input">
            <form className="chat-form" onSubmit={this.props.onMessageSubmit}>
                <div className="chat-input-container">
                <p className="check-email ml">{this.state.validated == true ? null : 'Пока что Very Magic Duck не поддерживает русский язык'}</p>
                    <textarea onKeyPress={this.handleKeyPress} type="text" id="message-area" placeholder="Напечатайте текст..." onChange={(event) => {
                        var regexp = /^[\u0020-\u007F]*$/i;
                        if(!regexp.test(event.target.value)) {
                            this.setState({validated: false})
                        }else{
                            this.setState({validated: true})
                        }
                        this.setState({typedMessage: event.target.value});
                                           }} className={this.state.validated == true ? "msg-input":"msg-input-invalid"} autofocus/>
                </div>
                <div className="send-btn">
                    <input onClick={this.sendMsg}  type="submit" className="msg-send" value=""/>
                </div>
            </form>
        </div>
    );}
}


export default ChatInput;
