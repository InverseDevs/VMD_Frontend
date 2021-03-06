import React from 'react';
import {Link} from 'react-router-dom';
import './MessageTo.css';
class MessageTo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userInfo: null
        }
    }
    getData = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
    getUserInfo = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/api/users/${this.props.sender_id}`)
        .then(data => {
            this.setState({userInfo:data})
        })
       
    }
    componentDidMount() {
    this.getUserInfo();
}
    render(){
        let user = this.state.userInfo;
        if (user != null) {
    return(
        <div className="message-to">
            <div className="user-to-info">
                <Link className="chat-profile-link" to={`/profile/${this.props.sender_id}`}><p className="user-to-name">{user.name}</p></Link>
                <Link className="chat-profile-link" to={`/profile/${this.props.sender_id}`}>{user.avatar != '' ? <img src={user.avatar} className="user-to-avatar" alt="user-to"/> : <div className="user-to-img"></div> }</Link>
            </div>
            <div className="message-to-container">
               {this.props.message}
            </div>
        </div>
    );}else{
      return (
          <div className="message-to">
            <div className="user-to-info">
                <p className="user-to-name"></p>
                <div className="user-to-img"></div>
            </div>
            <div className="message-to-container">
                <div className="msg-to"></div>
            </div>
        </div>
          )
    }
    
    }
    
}


export default MessageTo;
