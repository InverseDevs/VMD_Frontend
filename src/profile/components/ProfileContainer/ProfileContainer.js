import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './ProfileContainer.css';
import FetchData from '../../../services/FetchData';
class ProfileContainer extends React.Component {
    addPost = () => {
        this.setState(({postsNumber})=> 
        ({postsNumber: postsNumber+1}))
    };
    render() {
        return(
        <div className="profile-container">
            <ProfileHeader  userData={this.props.userData} addPost={this.addPost}/>
            <ProfileFooter />
        </div>
    );}
}

export default ProfileContainer;