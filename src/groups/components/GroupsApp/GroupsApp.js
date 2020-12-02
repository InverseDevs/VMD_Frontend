import React from 'react';
import './GroupsApp.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import GroupsContainer from '../GroupsContainer/GroupsContainer';
import GroupsList from '../GroupsList/GroupsList';
class GroupsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            groupId: null,
        }
    }
 
    componentDidMount(){
        console.log(window.location.pathname)
            if (window.location.pathname != '/groups'){
                console.log(window.location.pathname.slice(8));
            }
    }
    render() { 
        return ( 
            <div className="profile-page">

                        <Link to="/"><img src={logo} id="profile-logo"/></Link>
                        <div className="profile-big-ellipse" id="profile-big-1"></div>
                        <div className="profile-big-ellipse" id="profile-big-2"></div>
                        <div className="profile-ellipse" id="profile-1"></div>
                        <div className="profile-ellipse" id="profile-2"></div>
                        <div className="profile-ellipse" id="profile-3"></div>
                        <div className="profile-ellipse" id="profile-4"></div>
                        {this.state.groupId == null ? <GroupsList/> : <GroupsContainer groupId={this.state.groupId}/>}
                    </div>
         );
    }
}
 
export default GroupsApp;
