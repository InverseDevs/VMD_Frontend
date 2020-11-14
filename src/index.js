import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './chat/components/ChatApp/ChatApp';
import ProfileApp from './profile/components/ProfileApp/ProfileApp';
import LoginAppLogin from './login/components/LoginAppLogin/LoginAppLogin';
import LoginAppReset from './login/components/LoginAppReset/LoginAppReset';
import RegistrationApp from './registration/components/RegistrationApp/RegistrationApp';
import AfterRegister from './after-register/components/AfterRegister/AfterRegister';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
class App extends React.Component{
    state={
        userData: [],
        token: '',
    };
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
                    {window.localStorage.getItem('token')  && window.localStorage.getItem('token') !== '' && window.localStorage.getItem('id') ? <Redirect to={`/profile/${window.localStorage.getItem('id')}`} /> : <LoginAppLogin  getUserToken={this.getUserToken} getUserData={this.getUserData}/>}
                </Route>
                <Route exact path="/changePass" component={LoginAppReset}/>
                <Route exact path="/registration" component={RegistrationApp}/>
                <Route exact path="/after-registration" component={AfterRegister}/>
                <Route exact path="/chat">
                <ChatApp userData={this.state.userData}/>
                </Route>
                <Route exact path="/profile/:id">
                    <ProfileApp token={window.localStorage.getItem('token')}/>
                </Route>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
serviceWorker.unregister();