import React from 'react';
import './ProfileInfo.css';
import {Modal } from 'semantic-ui-react'

class ProfileInfo extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        fullInfo: false,
        open: false,
    }

}
    onCheckInfo = () => {
        this.setState({fullInfo: !this.state.fullInfo})
    }
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
                    <Modal
                        onClose={() => this.setState({open:false})}
                        onOpen={() => this.setState({open:true})}
                        open={this.state.open}
                        trigger={<button className="profile-create-post">Оставить запись</button>}
                        >
                        <Modal.Header>Пост</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                            <form className="post-form" >
                                <div className="post-input-container">
                                    <textarea type="text" placeholder="Расскажите ваши мысли здесь..."  className="post-input"/>
                                </div>
                            </form>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <input type="submit" className="post-send" value="Отправить" onClick={()=>{this.setState({open:false}); this.props.addPost(this.props.posts)}}/>
                            <label class="post-send add-file">
                            <input type="file"  accept=".jpg, .png, .jpeg"/>
                            Прикрепить
                            </label>    
                            <button className="close-btn" onClick={() => this.setState({open:false})}>Закрыть</button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ProfileInfo;
