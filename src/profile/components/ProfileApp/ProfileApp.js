import React from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './ProfileApp.css';
import logo from './logo.png';
import {Redirect} from 'react-router-dom';
class ProfileApp extends React.Component{
    constructor(props){
        super(props);
        this.state={token: '', 
                    userData: [], 
                    id: ''};
    }
    getData = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }
        });
        return await res.json();
    } 
    getUserData = async () => {
        if (window.location.pathname === '/profile/undefined%7D')
        {
            window.location.pathname = `/profile/${window.localStorage.getItem('id')}`
        }
        await this.getData(`https://inversedevs.herokuapp.com/api/users/${window.location.pathname.slice(9)}`)
        .then(data => {
            this.setState({userData: data}) 
            window.localStorage.setItem('name',data.name)
        });
    }
    rememberData = () => {
        let local = window.localStorage;      
        const token = window.localStorage.getItem('token');
        this.setState({token: token});
        const id = window.localStorage.getItem('id');
        this.setState({id: id});
        this.getUserData();
    };
    componentDidMount(){
        
        this.rememberData();
    }
    changeLocation = () => {
        window.location.pathname = `/profile/${window.localStorage.getItem('id')}`;
    }
    render(){
        return (
                    <div className="profile-page">

                        <img onClick={this.changeLocation} src={logo} id="profile-logo"/>
                        <div className="profile-big-ellipse" id="profile-big-1"></div>
                        <div className="profile-big-ellipse" id="profile-big-2"></div>
                        <div className="profile-ellipse" id="profile-1"></div>
                        <div className="profile-ellipse" id="profile-2"></div>
                        <div className="profile-ellipse" id="profile-3"></div>
                        <div className="profile-ellipse" id="profile-4"></div>
                        <ProfileContainer token={window.localStorage.getItem('token')} userData={this.state.userData}/>
                        
                    </div>
        );
    }
}

export default ProfileApp;