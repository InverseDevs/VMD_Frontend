import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './ProfileContainer.css';
class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
        
        }
    
    render() {
        return(
        <div className="profile-container">
            <ProfileHeader  token={window.localStorage.getItem('token')} userData={this.props.userData} />
            <ProfileFooter token={window.localStorage.getItem('token')} userData={this.props.userData}/>
        </div>
    );}
}

export default ProfileContainer;