import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    extractUser = (users) => {
            let user = Object.values(users).map(user => user.id != window.localStorage.getItem('id') ? user : null);
            user = user.filter(user => user != null);
            if (user.length == 1)
            {   
                return {...user}

            }
        
    }
    makeInfo = () => {
        let user = this.extractUser(this.props.users);
        this.props.getInfo(user[0].name,user[0].avatar, this.props.id)
    }
    render(){
    let user = this.extractUser(this.props.users);
    return(
        <div className="chat-group" onClick={this.makeInfo}>
            <div onClick={this.props.addTab} className={user[0].avatar != '' ? 'group-image-exist' : 'group-image'}>{user[0].avatar != '' ? <img className="user-pic" src={user[0].avatar} alt="user-img"/> : null}</div>
            <p className="group-name">{user[0].name}</p>
        </div>
    );
}
}
export default ChatGroup;
