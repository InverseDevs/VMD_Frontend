import React from 'react';
import './ProfileInfo.css';
import Modal from '../ProfileModal/ProfileModal';
class ProfileInfo extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        fullInfo: false,
        show: false,
    }

}
    onCheckInfo = () => {
        this.setState({fullInfo: !this.state.fullInfo})
    }
    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
    render() {
        const online = window.navigator.onLine;
        const status = online === true ? <h4 className="online">Онлайн</h4> : <h4 className="offline">Оффлайн</h4>
        const fullInfoPage = this.state.fullInfo === false ? null : <div>
                                                                        <h3 className="age">Языки: </h3>
                                                                        <h3 className="school">Телефон: </h3>
                                                                        <h3 className="phone-number">Увлечения: </h3>
                                                                    </div>
        return (
            <div className="profile-info">
                <div className="profile-info-header">
                    <h2 className="profile-username">{this.props.userData.name}</h2>
                    {status}
                </div>
                <div className="profile-info-footer">
                    <h3 className="profile-town">Город: {this.props.userData.birth_town}</h3>
                    <h3 className="profile-study">Место учёбы: </h3>
                    <h3 className="profile-bday">День рождения: {this.props.userData.birth_date}</h3>
                    {fullInfoPage}
                </div>
                
                <div className="profile-btns">
                    <button className="profile-readmore" onClick={this.onCheckInfo}>{this.state.fullInfo === false ? 'Показать подробнее' : 'Скрыть'}</button>
                    <Modal  show={this.state.show} handleClose={this.hideModal}>
                    <form className="post-form" >
                                    <div className="post-create-img"></div>
                                    <textarea type="text" placeholder="Расскажите ваши мысли здесь..."  className="post-input"/>

                            </form>
                            <input type="submit" className="post-send" value="Отправить" onClick={()=>{this.setState({show:false}); this.props.addPost(this.props.posts)}}/>
                            <label class="post-send add-file">
                            <input type="file"  accept=".jpg, .png, .jpeg"/>
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
