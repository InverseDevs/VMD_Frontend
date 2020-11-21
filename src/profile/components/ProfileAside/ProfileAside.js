import React from 'react';
import './ProfileAside.css';
import ProfileSettingsModal from '../ProfileSettingsModal/ProfileSettingsModal';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import { Link} from 'react-router-dom';
class ProfileInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: false,
        }
    }
    showModal = () => {
        this.setState({ show: true });
    };
    getShow = (showBool) => {
        this.setState({show: showBool})
    }
    hideModal = () => {
        this.setState({ show: false });
    };
    postData = async (url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }
        });
        return res.json();
    } 
    clearStorage = async () => {
        await this.postData(`https://inversedevs.herokuapp.com/exit/${window.localStorage.getItem('id')}`)
        .then(res => {console.log(res)});
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('id', '');
        window.localStorage.setItem('username','');
        window.localStorage.setItem('name','')
        
    }
    render() {
        return (
            <div className="profile-aside">
                <Link to="/friends"><button className="profile-friends">Друзья</button></Link>
                <Link to="/chat" ><button className="profile-chats">Чаты</button></Link>
                <button className="profile-groups">Группы</button>
                <button className="profile-music">Музыка</button>
                <ProfileSettingsModal show={this.state.show} handleClose={this.hideModal}>
                    <ProfileSettings userData={this.props.userData} getShow={this.getShow} />
                </ProfileSettingsModal>
                <button className="profile-music" onClick={this.showModal}>Настройки</button>
                <Link to="/login"><button className="profile-music" onClick={this.clearStorage}>Выйти</button></Link>
            </div>
        );
    }
}

export default ProfileInfo;