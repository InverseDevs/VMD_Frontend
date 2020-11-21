import React from 'react';
import ProfileSettingsModal from '../ProfileSettingsModal/ProfileSettingsModal';
import './ProfileSettings.css';

class ProfileSettings extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        name: '',
        town: '',
        study: '',
        birth: '',
        lang: '',
        phone: '',
        hobby: '',
        nc: false,
        tc:false,
        sc:false,
        bc:false,
        lc:false,
        pc:false,
        hc:false,
    }
  }
  handleNameChange= (e) => {
    this.setState({name:e.target.value});
}
handleTownChange= (e) => {
    this.setState({town:e.target.value});
}
handleStudyChange= (e) => {
    this.setState({study:e.target.value});
}
handleBirthChange= (e) => {
    this.setState({birth:e.target.value});
}
handleLangChange= (e) => {
    this.setState({lang:e.target.value});
}
handlePhoneChange= (e) => {
    this.setState({phone:e.target.value});
}
handleHobbyChange= (e) => {
    this.setState({hobby:e.target.value});
}
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
sendInfo = async () => {
  await this.postData(`https://inversedevs.herokuapp.com/api/users/change/${window.localStorage.getItem('id')}`, 
  {name : this.state.name, 
    birth_town:this.state.town, 
    study_place: this.state.study,
  birth_date: this.state.birth,
  languages: this.state.lang,
  phone: this.state.phone,
  hobbies: this.state.hobby}).then(res => console.log(res))
  document.getElementById('name-f').value = '';
  document.getElementById('town-f').value = '';
  document.getElementById('study-f').value = '';
  document.getElementById('birth-f').value = '';
  document.getElementById('lang-f').value = '';
  document.getElementById('phone-f').value = '';
  document.getElementById('hobby-f').value = '';
  this.setState({nc:false})
  this.setState({tc:false})
  this.setState({sc:false})
  this.setState({bc:false})
  this.setState({lc:false})
  this.setState({pc:false})
  this.setState({hc:false})
  this.props.getShow(false);
}

  componentDidUpdate(){
    if (document.getElementById('name-f').value !== this.props.userData.name && this.state.nc !== true){
      this.props.userData.name ? document.getElementById('name-f').value = `${this.props.userData.name}` : document.getElementById('name-f').value = '';
      this.setState({nc:true})
    }
    if (document.getElementById('town-f').value !== this.props.userData.birth_town && this.state.tc !== true){
      this.props.userData.birth_town ? document.getElementById('town-f').value = `${this.props.userData.birth_town}` : document.getElementById('town-f').value = '';
      this.setState({tc:true})
    }
    if (document.getElementById('study-f').value !== this.props.userData.study_place && this.state.sc !== true){
      this.props.userData.study_place ? document.getElementById('study-f').value =  `${this.props.userData.study_place}` : document.getElementById('study-f').value = '';
      this.setState({sc:true})
    }
    if (document.getElementById('birth-f').value !== this.props.userData.birth_date && this.state.bc !== true){
      this.props.userData.birth_date ? document.getElementById('birth-f').value =  `${this.props.userData.birth_date}`: document.getElementById('birth-f').value = '';
      this.setState({bc:true})
    }
    if (document.getElementById('lang-f').value !== this.props.userData.languages && this.state.lc !== true){
      this.props.userData.languages ? document.getElementById('lang-f').value =  `${this.props.userData.languages}`: document.getElementById('lang-f').value = '';
      this.setState({lc:true})
    }
    if (document.getElementById('phone-f').value !== this.props.userData.phone && this.state.pc !== true){
      this.props.userData.phone ? document.getElementById('phone-f').value =  `${this.props.userData.phone}`: document.getElementById('phone-f').value = '';
      this.setState({pc:true})
    }
    if (document.getElementById('hobby-f').value !== this.props.userData.hobbies && this.state.hc !== true){
      this.props.userData.hobbies ? document.getElementById('hobby-f').value =  `${this.props.userData.hobbies}`: document.getElementById('hobby-f').value = '';
      this.setState({hc:true})
    }
  }
  render()
  {
      return (
        <div className="settings">
            <h6 className="modal-title">Настройки</h6>
            <input onChange={this.handleNameChange} id="name-f" type="text" className="set-field" placeholder="Имя" />
            <input onChange={this.handleTownChange} id="town-f" type="text" className="set-field" placeholder="Город" />
            <input onChange={this.handleStudyChange} id="study-f" type="text" className="set-field" placeholder="Место учёбы" />
            <input onChange={this.handleBirthChange} id="birth-f" type="text" className="set-field" placeholder="День рождения" />
            <input onChange={this.handleLangChange} id="lang-f" type="text" className="set-field" placeholder="Языки" />
            <input onChange={this.handlePhoneChange} id="phone-f" type="text" className="set-field" placeholder="Телефон"/>
            <textarea onChange={this.handleHobbyChange} id="hobby-f" className="hobby-field" placeholder="Хобби" />
            <button onClick={this.sendInfo} className="send-info-btn">Отправить</button>
        </div>
      )
  }
}
export default ProfileSettings;
