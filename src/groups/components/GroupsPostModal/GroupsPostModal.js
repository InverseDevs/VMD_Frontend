import React, { Component } from 'react'
import './GroupsPostModal.css';

class GroupsPostModal extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className="post-create-modal">
                <form className="post-form" >
                                    <div id="post-img-container">
                                        <div className="post-create-img" id="post-create-img"></div> 
                                    </div>
                                    <textarea  id="textarea" type="text" placeholder="Расскажите ваши мысли здесь..."  className="post-input" />

                            </form>
                            <input type="submit" className="post-send" value="Отправить" onClick={()=>{this.setState({show:false}); }}/>
                            <label className="post-send add-file">
                            <input type="file" id="post-photo-input" accept=".jpg, .png, .jpeg"/>
                            Прикрепить
                            </label>  
            </div>
          );
    }
}
 
export default GroupsPostModal;