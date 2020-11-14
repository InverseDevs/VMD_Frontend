import React from 'react';
import './LoginAppReset.css';
import logo from './logo_opacity.png';
import {Link} from 'react-router-dom';
class LoginAppReset extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            error: '',
            correct: false,
        }
    }
    handleEmailChange= (e) => {
        this.setState({email:e.target.value});
    }
    postData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await res.json();
    } 
    submitForm = async (e) => {
        e.preventDefault();
        this.setState({error: ''});
        await this.postData('https://inversedevs.herokuapp.com/forgot_password',{email: this.state.email})
        .then(data =>  {
            if (data.status !== undefined){
                this.setState({error: data.status});
                console.log(this.state.error);
            } 
            if (data.status == 'success'){
                this.setState({correct: true});
            }
        })
    }
    err_msg = () => {
        if (this.state.error == 'incorrect email' || this.state.error == 'user not found'){
            return 'Неправильно введена почта';
        }

        return ''
    }
    is_okay = () => {
        if (this.state.correct == true){
            return 'Вам на почту отправлено письмо'
        }
        return '';
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
                <p id="subtitle">Мы не скрываем, что работаем на ФСБ</p>
            </div>
            <div id="form" class="flat-form">
            <ul class="tabs">
                <li>
                    <Link to="/">Войти</Link>
                </li>
                <li>
                    <Link to="/changePass" class="active">Смена пароль</Link>
                </li>
                </ul>
                <div id="login" class="form-action show">
                    <div id="form-header">
                    <img src={logo} alt="logo" id="form_logo"/>
                    <Link to="/registration" id="register">Регистрация</Link>
                    </div>
                    <p className="error">{`${this.err_msg()}`}</p> 
                    <p className="success">{`${this.is_okay()}`}</p>
                    <form onSubmit={this.submitForm}>
                                  <ul>
                                      <li>
                                          <input type="email"   onChange={this.handleEmailChange} placeholder="Электронная почта:" autoFocus required />
                                      </li>
                                      <li>
                                          <input type="submit" value="Отправить" class="button" />
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

export default LoginAppReset;