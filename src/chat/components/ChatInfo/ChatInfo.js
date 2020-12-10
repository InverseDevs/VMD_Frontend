import React from 'react';
import './ChatInfo.css';
import {Link} from 'react-router-dom';
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
     deleteChat = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/chat/delete/${this.props.chatInfo.id}`)
       
    }
    render(){
        if (this.props.chatInfo != null) {
        return (
            <div className="chat-info">
                <Link to={`/profile/${this.props.id}`} >{this.props.chatInfo.img != ''? <img src={this.props.chatInfo.img} alt="chat-img" className="chat-img-icon"/> : <div className="chat-img"></div>}</Link> 
                <div className="friend-name-link">  
                <Link to={`/profile/${this.props.id}`}><p className="chat-info-name">{this.props.chatInfo.name != '' ? this.props.chatInfo.name : 'chatName'}</p></Link>
                </div>
                <button onClick={this.deleteChat} className="delete-chat">Удалить</button>
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
