import React from 'react';
import './LoginAppLogin.css';
import logo from './duck_logo.png';
import {Link, withRouter} from 'react-router-dom';
class LoginAppLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            error: '',

        }
    }
    handleEmailChange= (e) => {
        this.setState({email:e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    postData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        console.log(res.headers.get('Authorization'));
        for (let [key, value] of res.headers) {
            console.log(`${key} = ${value}`);
          }
        return await res.json();
    } 
    submitForm = async (e) => {
        e.preventDefault();
        this.setState({error: ''});
        await this.postData('https://inversedevs.herokuapp.com/authorization',{username: this.state.email, password: this.state.password})
        .then(data =>  {
            if (data.status !== undefined){
                this.setState({error: data.status});
                console.log(this.state.error);
            };
            return data;
        })
        .then(data => {
                if (this.state.error == ''){
                this.props.getUserData(data);
                this.props.history.push(`/profile/${data.id}`);
                }
        })
      }
      err_msg = () => {
        if (this.state.error == 'incorrect password'){
            return 'Неверный пароль';
        }
        if (this.state.error == 'user not found'){
            return 'Такого пользователя не существует';
        }
        return ''
    }
    render(){
        return (
            <div className="loginApp">
            <div id="ellipse_left"></div>
            <div id="big_ellipse_left"></div>
            <div id="big_ellipse_right"></div>
            <div id="small_ellipse_top"></div>
            <div id="small_ellipse_middle"></div>
            <div id="small_ellipse_bottom"></div>
            <div id="text">
                <img src={logo} alt="logo" id="logo"/>
                <p id="title">VMD - Very Magic Duck</p>
                <p id="subtitle">Самая утиная социальная сеть в мире!</p>
            </div>
            <div id="form" class="flat-form">
            <ul class="tabs">
                <li>
                    <Link to="/" class="active">Войти</Link>
                </li>
                <li>
                    <Link to="/changePass">Смена пароль</Link>
                </li>
                </ul>
                <div id="login" class="form-action show">
                    <div id="form-header">
                    <img src={logo} alt="logo" id="form_logo"/>
                    <Link to="/registration" id="register">Регистрация</Link>
                    </div>
                    <p className="error">{`${this.err_msg()}`}</p> 
                    <form onSubmit={this.submitForm}>
                        <ul>
                            
                            <li>
                                <input type="text" onChange={this.handleEmailChange} id="login-email" placeholder="Логин:" required autoFocus/>
                            </li>
                            <li>
                                <input type="password" onChange={this.handlePasswordChange} id="login-pass" placeholder="Пароль:" required/>
                            </li>
                              <li>
                               <input type="submit" value="Войти" class="button"/>
                            </li>

                        </ul>
                        
                    </form>
                    </div>
        </div>

    <div id="shadow"></div>
            </div>
        )
    }
}

export default withRouter(LoginAppLogin);
