import React from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './ProfileApp.css';
import logo from './logo_opacity.png';
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
        await this.getData(`https://inversedevs.herokuapp.com/api/users/${window.localStorage.getItem('id')}`)
        .then(data => {
            this.setState({userData: data});   
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
                        <ProfileContainer token={window.localStorage.getItem('token')} userData={this.state.userData}/>
                        
                    </div>
        );
    }
}

export default ProfileApp;