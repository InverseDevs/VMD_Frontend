import React from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './ProfileApp.css';
import logo from './logo_opacity.png';
class ProfileApp extends React.Component{
    
    render(){
        return (
                    <div className="profile-page">

                        <img src={logo} id="profile-logo"/>
                        <div className="profile-big-ellipse" id="profile-big-1"></div>
                        <div className="profile-big-ellipse" id="profile-big-2"></div>
                        <div className="profile-ellipse" id="profile-1"></div>
                        <div className="profile-ellipse" id="profile-2"></div>
                        <div className="profile-ellipse" id="profile-3"></div>
                        <div className="profile-ellipse" id="profile-4"></div>
                        <ProfileContainer userData={this.props.userData}/>
                        
                    </div>
        );
    }
}

export default ProfileApp;