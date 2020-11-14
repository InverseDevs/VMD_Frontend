import React from 'react';
import './ProfileAside.css';
import { Link} from 'react-router-dom';
class ProfileInfo extends React.Component{
    clearStorage = () => {
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('id', '');
    }
    render() {
        return (
            <div className="profile-aside">
                <button className="profile-friends">Друзья</button>
                <Link to="/chat" ><button className="profile-chats">Чаты</button></Link>
                <button className="profile-groups">Группы</button>
                <button className="profile-music">Музыка</button>
                <Link to="/login"><button className="profile-music" onClick={this.clearStorage}>Выйти</button></Link>
            </div>
        );
    }
}

export default ProfileInfo;
