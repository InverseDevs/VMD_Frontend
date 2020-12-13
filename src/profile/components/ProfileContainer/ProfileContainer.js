import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import logo from './logo.png';
import './ProfileContainer.css';
class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataChanged:false,
        }
    }

    changeLocation = () => {
        window.location.pathname = `/profile/${window.localStorage.getItem('id')}`;
    }
    getChanged = (bool) => {
        this.setState({dataChanged: bool})
    }
    render() {
        return(
        <div className="profile-container">
             <img onClick={this.changeLocation} src={logo} id="profile-logo"/>
            <ProfileHeader getChanged={this.getChanged} token={window.localStorage.getItem('token')} userData={this.props.userData} />
            <ProfileFooter nameCheck={this.props.nameCheck} dataChanged={this.state.dataChanged} token={window.localStorage.getItem('token')} userData={this.props.userData}/>
        </div>
    );}
}

export default ProfileContainer;
