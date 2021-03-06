import React from 'react';
import './RegistrationApp.css';
import logo  from './logo.png';
import { withRouter } from 'react-router-dom';
class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: '',
            login: '',
            repassword: '',
            password: '',
            error: '',
            same_password: true,
            success: false,
            validated: true,
        }
    }
    
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    handleEmailChange= (e) => {
        if (this.validateEmail(e.target.value) == true){
            this.setState({validated: true});   
        }
        else{
            this.setState({validated: false});   
        }
        this.setState({email:e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    handleRePasswordChange = (e) => {
        this.setState({repass: e.target.value});
    }
    handleLoginChange = (e) => {
        this.setState({login: e.target.value});
    }
    postData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await res.json();
    } 
    submitForm = async (e) => {
        if (this.state.validated == true) {
        e.preventDefault();
        this.setState({error: ''});
        this.setState({same_password: true})
        if (this.state.password == this.state.repass){
        await this.postData('https://inversedevs.herokuapp.com/registration',
        {username: this.state.login, 
         password: this.state.password,
         email: this.state.email,
         })
        .then(data =>  {
            if (data.status !== undefined){
                this.setState({error: data.status});
                console.log(this.state.error);
                this.setState({success: false});
            };
        
            if (data.status === 'success' && this.state.same_password == true){
                this.setState({success: true});
            }
        })}else{this.setState({same_password: false, success:false})} }
    };

        err_msg = () => {
        if (this.state.error == 'user already exists'){
            return 'Такой пользователь уже существует';
        }
        if (this.state.same_password == false){
            return 'Пароли должны совпадать';
        }
        return '';
    }
   

    render()
    {
        return (
            <div className="registration">
            <div id="reg-left-ellipse"></div>
            <div id="reg-right-ellipse"></div>
            <div id="reg-small-ellipse-1"></div>
            <div id="reg-small-ellipse-2"></div>
            <div id="reg-small-ellipse-3"></div>
            <div id="reg-shadow"></div>
            <form id="reg-form" onSubmit={this.submitForm}>
                <div id="reg-form-header">
                <img src={logo} alt="logo" id="reg-form-logo"/>
                <p id="reg-form-title">Регистрация</p>
                </div>
                <p className="error-msg">{`${this.err_msg()}`}</p>
                <p className="check-email mlmax">{this.state.validated == false ? 'Вы ввели почту в неправильном формате' : null}</p>
                <p className="check-email-valid">{this.state.success === true ? 'Подтвердите регистрацию на почте' : ''}</p>
                <input onChange={this.handleEmailChange} type="email" name="email" id={this.state.validated == true ? "reg-email-field" : "reg-email-field-incorrect"} placeholder="Почта" required autoFocus/>
                <input onChange={this.handleLoginChange} type="text" name="login" id="reg-login-field" placeholder="Логин" required/>
                <input onChange={this.handlePasswordChange} type="password" name="pass" id="reg-pass-field" placeholder="Пароль" required/>
                <input onChange={this.handleRePasswordChange} type="password" name="pass" id="reg-pass-field" placeholder="Повторите пароль" required/>
                <input type="submit" id="reg-btn" value="Зарегистрироваться" />
            </form>
            </div>
        )
    }
}

export default withRouter(Registration);
