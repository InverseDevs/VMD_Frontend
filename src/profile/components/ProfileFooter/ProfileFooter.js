import React from 'react';
import ProfileAside from '../ProfileAside/ProfileAside';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import './ProfileFooter.css';
class ProfileFooter extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="profile-footer">
                <ProfileAside userData={this.props.userData}/>
                <ProfilePosts dataChanged={this.props.dataChanged} token={window.localStorage.getItem('token')} userData={this.props.userData}/>
            </div>
        );
    }
}

export default ProfileFooter;