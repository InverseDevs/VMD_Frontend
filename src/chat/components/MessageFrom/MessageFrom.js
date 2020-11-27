import React from 'react';
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
            console.log(data);
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
                    <div className="user-from-img">{user.avatar != '' ? <img src={user.avatar} className="user-from-avatar" alt="user-from"/> : null }</div>
                    <p className="user-from-name">{user.name}</p>
                </div>
                <div className="message-from-container">
                    <p className="msg-from">{this.props.message}</p>
                </div>
            </div>
        );
        }
    }
}

export default MessageFrom;
