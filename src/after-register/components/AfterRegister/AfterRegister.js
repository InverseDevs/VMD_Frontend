import React from 'react';
import './AfterRegister.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
class AfterRegister extends React.Component {
    constructor(props) {
        super(props);
    }
    postData = async (url) => {
        const res = await fetch(url, {
            method: 'POST',
        });
        return res.json();
    } 
    verificateUser = async () => {

        const id = window.location.pathname.slice(20)
        await this.postData(`https://inversedevs.herokuapp.com/verification/${id}`)
    }
    componentDidMount() {
        this.verificateUser();
}
    render()
    {
        return (
            <div className="after-register">
            <div id="thanks-big-ellipse-top">
            </div>
            <div id="thanks-big-ellipse-bot">
            </div>
            <div id="thanks-small-ellipse-1" 
            ></div>
            <div id="thanks-small-ellipse-2" 
            ></div>
            <div id="thanks-small-ellipse-3" 
            ></div>
            <div id="thanks-small-ellipse-4" 
            ></div>
            <img src={logo} id="thanks-logo"/>
            <p id="thanks-title">Вас приветствует команда VMD!</p>
            <p id="thanks-subtitle" >Спасибо за прохождение регистрации
            Подтвердите регистрацию на почте</p>
            <Link id="to-login" to="/login"n><button id="thanks-btn">Продолжить</button></Link>

    </div>  
        )
    }
}
export default AfterRegister;