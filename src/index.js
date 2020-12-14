import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './chat/components/ChatApp/ChatApp';
import ProfileApp from './profile/components/ProfileApp/ProfileApp';
import LoginAppLogin from './lambda/LoginAppLogin';
import LoginAppReset from './lambda/LoginAppReset/LoginAppReset';
import RegistrationApp from './registration/components/RegistrationApp/RegistrationApp';
import AfterRegister from './after-register/components/AfterRegister/AfterRegister';
import FriendsApp from './friends/components/FriendsApp/FriendsApp';
import MusicApp from './music/components/MusicApp/MusicApp';
import GroupsApp from './groups/components/GroupsApp/GroupsApp';

import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
class App extends React.Component{
    state={
        userData: [],
        token: '',
    };
postData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }
        });
        return res.json();
    } 
post = async (url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }
        });
        return res.json();
    } 
    changeStatus = async (bool) => {
        if (window.localStorage.getItem('id') != null || window.localStorage.getItem('id') != undefined || window.localStorage.getItem('id') != ''){
            await this.postData(`https://inversedevs.herokuapp.com/user/online/${window.localStorage.getItem('id')}`,{state: bool})
            .then(data => console.log(data)); 
        }
    }
    onUnload = async () => {
        await this.changeStatus(false)
    }
    onLoad = async () => {

        await this.changeStatus(true)
    }
    componentDidMount() {
        this.onLoad();
         window.addEventListener("beforeunload", this.exit);
         //window.addEventListener("beforeunload", this.unload);
        window.addEventListener("unload", this.exit);
        // window.addEventListener("unload", this.unload);
     }

  componentWillUnmount() {
   window.removeEventListener("beforeunload", this.exit);
      //window.removeEventListener("beforeunload", this.unload);
      window.removeEventListener("unload", this.exit);
     // window.removeEventListener("unload", this.unload);
  }

    exit = async () => {
        await this.post(`https://inversedevs.herokuapp.com/exit/${window.localStorage.getItem('id')}`)
    }
  unload = async (e) => {
      e.preventDefault();
    await navigator.sendBeacon(`https://inversedevs.herokuapp.com/exit/${window.localStorage.getItem('id')}`);
  }

    getUserData = (data) => {
        this.setState({userData: data});
    }
    getUserToken = (token) => {
        this.setState({token: token})
    }

    render(){
        return (
            <BrowserRouter>
                
                <Route exact path="/">
                    { window.localStorage.getItem('token') !== ''  && window.localStorage.getItem('id') !== '' && window.localStorage.getItem('id') !== null? <Redirect to={`/profile/${window.localStorage.getItem('id')}`} /> : <LoginAppLogin  getUserToken={this.getUserToken} getUserData={this.getUserData}/>}
                </Route>
                <Route exact path="/login">
                <LoginAppLogin  getUserToken={this.getUserToken} getUserData={this.getUserData}/>
                </Route>

                <Route exact path="/changePass" component={LoginAppReset}/>
                <Route exact path="/registration" component={RegistrationApp}/>
                <Route exact path="/after-registration/:id" component={AfterRegister}/>
                <Route exact path="/chat">
                <ChatApp userData={this.state.userData}/>
                </Route>
                <Route exact path="/friends" component={FriendsApp} />
                <Route exact path="/music" component={MusicApp} />
                <Route exact path="/profile/:id">
                    <ProfileApp token={window.localStorage.getItem('token')}/>
                </Route>
                <Route exact path="/groups" component={GroupsApp}/>
                <Route exact path="/groups/:id" component={GroupsApp}/>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
serviceWorker.unregister();
