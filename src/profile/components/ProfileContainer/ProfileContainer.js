import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './ProfileContainer.css';
class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postNumber: 0,
        }
    }
    addPost = (posts) => {
        this.setState({postNumber: posts + 1})
    };
    render() {
        return(
        <div className="profile-container">
            <ProfileHeader  userData={this.props.userData} posts={this.state.postNumber} addPost={this.addPost}/>
            <ProfileFooter postNumber={this.state.postNumber}/>
        </div>
    );}
}

export default ProfileContainer;