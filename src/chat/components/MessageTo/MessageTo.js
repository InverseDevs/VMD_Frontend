import React from 'react';
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
            console.log(data);
            this.setState({userInfo:data})
        })
       
    }
    componentDidMount() {
    this.getUserInfo();
}
    render(){
    return(
        <div className="message-to">
            <div className="user-to-info">
                <p className="user-to-name">{this.state.userInfo.name}</p>
                <div className="user-to-img"></div>
            </div>
            <div className="message-to-container">
                <p className="msg-to">{this.props.message}</p>
            </div>
        </div>
    );}
}


export default MessageTo;