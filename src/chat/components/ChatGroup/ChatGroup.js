import React from 'react';
import './ChatGroup.css';

class ChatGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }
    extractUser = (users) => {
            console.log(Object.values(users))
        }
    }
    componentDidMount() {
        this.extractUser(this.props.users);
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
