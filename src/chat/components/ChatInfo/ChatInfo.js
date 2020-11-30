import React from 'react';
import './ChatInfo.css';

class ChatInfo extends React.Component{
    constructor(props) {
        super(props);
    }
    getData = async (url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
     deleteMessages = async () => {
        let messages = []
        await this.getData(`https://inversedevs.herokuapp.com/chat/delete/${this.props.chatId}`)
        })
       
    }
    render(){
        if (this.props.chatInfo != null) {
        return (
            <div className="chat-info">
                <div className={this.props.chatInfo.img != '' ? "chat-img-exist" : "chat-img"}>{this.props.chatInfo.img != ''? <img src={this.props.chatInfo.img} alt="chat-img" className="chat-img-icon"/> : null}</div>
                <p className="chat-info-name">{this.props.chatInfo.name != '' ? this.props.chatInfo.name : 'chatName'}</p>
                <button className="delete-chat">Удалить</button>
            </div>
        )
    }
    else{ return (
        <div className="chat-info">
    </div>)
    }
}
}
export default ChatInfo;
