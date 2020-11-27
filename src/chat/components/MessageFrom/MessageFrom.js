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
        return(
            <div className="message-from">
                <div className="user-from-info">
                    <div className="user-from-img"></div>
                    <p className="user-from-name">name</p>
                </div>
                <div className="message-from-container">
                    <p className="msg-from">{this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default MessageFrom;
