import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }
    extractUser = (users) => {
            let user = Object.values(users).map(user => user.id != window.localStorage.getItem('id') ? user : null);
            user = user.filter(user => user != null);
            if (user.length == 1)
            {
                console.log(Object.values(user));
                return Object.assing({},user)[0]
            }
        
    }
    render(){
    let user = this.extractUser(this.props.users);
    return(
        <div className="chat-group">
            <div onClick={this.props.addTab} className="group-image"></div>
            <p className="group-name">{user != undefined ? user.name : null}</p>
        </div>
    );
}
}
export default ChatGroup;
