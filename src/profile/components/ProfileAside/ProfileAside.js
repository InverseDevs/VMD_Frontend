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
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('id', '');
        window.localStorage.setItem('username','');
        window.localStorage.setItem('name','')
        window.localStorage.setItem('tabs',"")
        
    }
        componentDidMount() {
        this.setState({show: this.props.nameCheck})
}
    render() {
        return (
            <div className="profile-aside">
                <Link to="/friends"><button className="profile-friends">Друзья</button></Link>
                <Link to="/chat" ><button className="profile-chats">Чаты</button></Link>
                <Link to="/groups"><button className="profile-groups">Группы</button></Link>
                <Link to="/music"><button className="profile-music">Музыка</button></Link>
                <ProfileSettingsModal show={this.state.show} handleClose={this.hideModal}>
                    <ProfileSettings userData={this.props.userData} getShow={this.getShow} />
                </ProfileSettingsModal>
            {this.props.userData.id == window.localStorage.getItem('id') ? <button className="profile-music" onClick={this.showModal}>Настройки</button> : null}
                <Link to="/login"><button className="profile-music" onClick={this.clearStorage}>Выйти</button></Link>
            </div>
        );
    }
}

export default ProfileInfo;
