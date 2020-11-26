import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }
    extractUser = (users) => {
        let user = users.find(user => user.id != window.localStorage.getItem('id'))
        console.log("this is user",user)
        this.setState({user: user});

    }
    componentDidMount() {
        this.extractUser(this.props.users);
        console.log(this.state.user);
    }
    render(){
    
    return(
        <div className="chat-group">
            <div onClick={this.props.addTab} className="group-image"></div>
            <p className="group-name"></p>
        </div>
    );
}
}
export default ChatGroup;
