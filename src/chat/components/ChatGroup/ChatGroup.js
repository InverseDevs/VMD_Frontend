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
                return user[0]

            }
        
    }
    makeInfo = async () => {
        let user = await this.extractUser(this.props.users);
        console.log('name',user.name)
        console.log('avatar',user.avatar)
        console.log('id',this.props.id);
        await this.props.getInfo(user.name,user.avatar, this.props.id)
        await this.props.addTab(user.name,user.avatar)
    }
    render(){
    let user = this.extractUser(this.props.users);
    return(
        <div className="chat-group" onClick={this.makeInfo}>
            <div className={user.avatar != '' ? 'group-image-exist' : 'group-image'}>{user.avatar != '' ? <img className="user-pic" src={user.avatar} alt="user-img"/> : null}</div>
            <p className="group-name">{user.name}</p>
        </div>
    );
}
}
export default ChatGroup;
