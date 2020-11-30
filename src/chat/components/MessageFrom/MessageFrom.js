import React from 'react';
import {Link} from 'react-router-dom';
import './MessageFrom.css';

class MessageFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userInfo: null
        };
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
    render() {
        let user = this.state.userInfo;
        if (user != null) {
        return(
            <div className="message-from">
                <div className="user-from-info">
                    <div className={user.avatar != '' ? "user-from-img-exist" : "user-from-img"}>{user.avatar != '' ? <img src={user.avatar} className="user-from-avatar" alt="user-from"/> : null }</div>
                    <Link to=`/profile/${this.props.sender_id}`><p className="user-from-name">{user.name}</p></Link>
                </div>
                <div className="message-from-container">
                   {this.props.message}
                </div>
            </div>
        );
        }else {
         return (
            <div className="message-from">
                <div className="user-from-info">
                    <div className="user-from-img"></div>
                    <p className="user-from-name"></p>
                </div>
                <div className="message-from-container">
                    <p className="msg-from"></p>
                </div>
            </div>
             )
        }
    }
}

export default MessageFrom;
