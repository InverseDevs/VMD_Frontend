import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }
    extractUser = (users) => {
        let user = users.find(user => user.id == window.localStorage.getItem('id'))
        this.setState({user: user});
    }
    componentDidMount() {
        this.extractUser(this.props.users);
    }
    render(){

    return(
        <div className="chat-group">
            <div onClick={this.props.addTab} className="group-image"><img src={this.state.user.avatar} alt="user-pic"/></div>
            <p className="group-name">{this.state.user.name}</p>
        </div>
    );
}
}
export default ChatGroup;
