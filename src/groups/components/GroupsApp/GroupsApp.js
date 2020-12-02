import React from 'react';
import './GroupsApp.css';
import logo from './logo.png';
import GroupsContainer from '../GroupsContainer/GroupsContainer';
import GroupsList from '../GroupsList/GroupsList';
class GroupsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            groupClicked : false,
            groupId: null,
        }
    }
    setGroupClick = () => {
        this.setState({groupClicked: true})
    }
    getGroupInfo = (object) =>{
        this.setState({groupId : object})
    }
    closeGroup = () => {
        this.setGroupClick(false);
    }
    render() { 
        return ( 
            <div className="profile-page">

                        <img onClick={this.closeGroup} src={logo} id="profile-logo"/>
                        <div className="profile-big-ellipse" id="profile-big-1"></div>
                        <div className="profile-big-ellipse" id="profile-big-2"></div>
                        <div className="profile-ellipse" id="profile-1"></div>
                        <div className="profile-ellipse" id="profile-2"></div>
                        <div className="profile-ellipse" id="profile-3"></div>
                        <div className="profile-ellipse" id="profile-4"></div>
                        {this.state.groupClicked == false ? <GroupsList setGroupClick={this.setGroupClick} getGroupInfo={this.getGroupInfo}/> : <GroupsContainer groupId={this.state.groupId}/>}
                    </div>
         );
    }
}
 
export default GroupsApp;