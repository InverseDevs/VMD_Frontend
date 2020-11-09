import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './chat/components/ChatApp/ChatApp';
import ProfileApp from './profile/components/ProfileApp/ProfileApp';
import LoginAppLogin from './login/components/LoginAppLogin/LoginAppLogin';
import LoginAppReset from './login/components/LoginAppReset/LoginAppReset';
import RegistrationApp from './registration/components/RegistrationApp/RegistrationApp';
import AfterRegister from './after-register/components/AfterRegister/AfterRegister';
import {BrowserRouter, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

class App extends React.Component{
    state={
        userData: '',
    };
    getUserData = (data) => {
        this.setState({userData: data});
    }
    render(){
        return (
            <BrowserRouter>
                <Route exact path="/">
                    <LoginAppLogin getUserData={this.getUserData}/>
                </Route>
                <Route exact path="/changePass" component={LoginAppReset}/>
                <Route exact path="/registration" component={RegistrationApp}/>
                <Route exact path="/after-registration" component={AfterRegister}/>
                <Route exact path="/chat">
                <ChatApp userData={this.state.userData}/>
                </Route>
                <Route exact path="/profile/:id">
                    <ProfileApp userData={this.state.userData}/>
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