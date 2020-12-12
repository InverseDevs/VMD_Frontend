import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './ProfileContainer.css';
class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataChanged:false,
            nameCheck:  /^$/.test(this.props.userData.name),
        }
    }


    getChanged = (bool) => {
        this.setState({dataChanged: bool})
    }
    render() {
        return(
        <div className="profile-container">
            <ProfileHeader  getChanged={this.getChanged} token={window.localStorage.getItem('token')} userData={this.props.userData} />
            <ProfileFooter nameCheck={this.state.nameCheck} dataChanged={this.state.dataChanged} token={window.localStorage.getItem('token')} userData={this.props.userData}/>
        </div>
    );}
}

export default ProfileContainer;
