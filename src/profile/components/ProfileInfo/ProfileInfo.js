import React from 'react';
import './ProfileInfo.css';
import Modal from '../ProfileModal/ProfileModal';
class ProfileInfo extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        fullInfo: false,
        show: false,
        postText: '',
        photo: '',
        dataChanged: false,
    }

}
getFile = () => {
    var file = document.getElementById('post-photo-input').files[0];
    var img = document.createElement("img");
    img.file = file;
    img.width = 540;
    img.height = 270;
    document.getElementById('post-create-img').appendChild(img);
    var reader = new FileReader();
    reader.onload = (function(aImg) { 
        return function(e) { 
            aImg.src = e.target.result;
    }; 
    })(img);
    reader.onloadend = () => {
        this.setState({photo: reader.result})
      }
      document.getElementById('post-create-img').appendChild(img);
    reader.readAsDataURL(file);
  
}
    handlePostTextChange= (e) => {
        this.setState({postText:e.target.value});
    }
    onCheckInfo = () => {
        this.setState({fullInfo: !this.state.fullInfo})
    }
    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
        document.getElementById('post-create-img').parentNode.removeChild(document.getElementById('post-create-img'));
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

    sendPost = async () => {
        
        await this.postData(`https://inversedevs.herokuapp.com/post/${this.props.userData.id}`, {sender : window.localStorage.getItem('username'), content:this.state.postText, picture: this.state.photo, type: 'user', attempter_id: window.localStorage.getItem('id')})


        document.getElementById('textarea').value = '';
        this.setState({dataChanged:true})
        this.props.getChanged(this.state.dataChanged);
        this.setState({dataChanged:false});
    }
    render() {
        const status = this.props.userData.online === false ? <div className="offline"></div> : <div className="online"></div>
        const fullInfoPage = this.state.fullInfo === false ? null : <div>
                                                                        <h3 className="age">Языки: {this.props.userData.languages}</h3>
                                                                        <h3 className="school">Телефон: {this.props.userData.phone}</h3>
                                                                        <h3 className="phone-number">Увлечения: {this.props.userData.hobbies}</h3>
                                                                    </div>
        return (
            <div className="profile-info">
                <div className="profile-info-header">
                    <h2 className="profile-username">{this.props.userData.name}</h2>
                    {status}
                </div>
                <div className="profile-info-footer">
                    <h3 className="profile-town">Город: {this.props.userData.birth_town}</h3>
                    <h3 className="profile-study">Место учёбы: {this.props.userData.study_place}</h3>
                    <h3 className="profile-bday">День рождения: {this.props.userData.birth_date}</h3>
                    {fullInfoPage}
                </div>
                
                <div className="profile-btns">
                    <button className="profile-readmore" onClick={this.onCheckInfo}>{this.state.fullInfo === false ? 'Показать подробнее' : 'Скрыть'}</button>
                    <Modal  show={this.state.show} handleClose={this.hideModal}>
                    <form className="post-form" >
                                    <div id="post-img-container">
                                        <div className="post-create-img" id="post-create-img"></div> 
                                    </div>
                                    <textarea onChange={this.handlePostTextChange} id="textarea" type="text" placeholder="Расскажите ваши мысли здесь..."  className="post-input" />

                            </form>
                            <input type="submit" className="post-send" value="Отправить" onClick={()=>{this.setState({show:false}); this.sendPost();
                            document.getElementById('post-create-img').parentNode.removeChild(document.getElementById('post-create-img'));
                            }}/>
                            <label className="post-send add-file">
                            <input onChange={this.getFile} type="file" id="post-photo-input" accept=".jpg, .png, .jpeg"/>
                            Прикрепить
                            </label>  
                    </Modal>
                    <button className="profile-create-post" onClick={this.showModal}>Оставить запись</button>
                </div>
            </div>
        );
    }
}

export default ProfileInfo;
