import React from 'react';
import './MusicApp.css';
import logo from './logo.png';
import MusicContainer from '../MusicContainer/MusicContainer';
class MusicApp extends React.Component {
    changeLocation = () => {
        window.location.pathname = `/profile/${window.localStorage.getItem('id')}`;
    }
    render(){
        return (
            <div className="profile-page">

                        <img onClick={this.changeLocation} src={logo} id="music-logo"/>
                        <div className="profile-big-ellipse" id="profile-big-1"></div>
                        <div className="profile-big-ellipse" id="profile-big-2"></div>
                        <div className="profile-ellipse" id="profile-1"></div>
                        <div className="profile-ellipse" id="profile-2"></div>
                        <div className="profile-ellipse" id="profile-3"></div>
                        <div className="profile-ellipse" id="profile-4"></div>
                        <MusicContainer />
                    </div>
        )
    }
}
export default MusicApp;