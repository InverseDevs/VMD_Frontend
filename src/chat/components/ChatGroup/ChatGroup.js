import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }
    extractUser = (users) => {
        let user = this.getUser(users);
        console.log(user);
    }
    getUser = (users) => {
        for (let i = 0; i < users.length; ++i)
        {
            if (users[i].id != window.localStorage.getItem('id')){
                return users[i];
            }
        }
    }
    componentDidMount() {
        this.extractUser(this.props.users);
    }
    render(){
    
    return(
        <div className="chat-group">
            <div onClick={this.props.addTab} className="group-image"><img src={this.state.user.avatar != null ? this.state.user.avatar: null} alt="user-pic"/></div>
            <p className="group-name">{this.state.user.name}</p>
        </div>
    );
}
}
export default ChatGroup;
