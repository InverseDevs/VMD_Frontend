import React, { Component } from 'react'
import './GroupsPostModal.css';

class GroupsPostModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            photo: '',
            postText: '',
            validated: true,
        }
    }
    handleText = (event) => {
        var regexp = /^[\u0020-\u007F]*$/i;
   if(!regexp.test(event.target.value)) {
      this.setState({validated: false})
   }else{
     this.setState({validated: true})
   }
        this.setState({postText:event.target.value});   
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
    sendPost = async () => {
        
        await this.postData(`https://inversedevs.herokuapp.com/post/${this.props.id}`, {sender : window.localStorage.getItem('username'), 
                                                                                        content:this.state.postText, picture: this.state.photo,type: 'group' , attempter_id: window.localStorage.getItem('id')})
        .then(res => {console.log(res)});
        document.getElementById('textarea').value = '';
        this.props.getClosePost();
    }
   
    getFile = () => {
        var file = document.getElementById('post-photo-input').files[0];
        var img = document.createElement("img");
        img.file = file;
        img.width = 540;
        img.height = 270;
        img.classList.add('inner-photo');
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
   
    render() { 
        return (
            <div className="group-post-create-modal">
                <form className="post-form" >
                                    <div id="post-img-container">
                                        <div className="group-post-create-img" id="post-create-img"></div> 
                                    </div>
                                    <p className="check-email ml">{this.state.validated == true ? null : 'Пока что Very Magic Duck не поддерживает русский язык'}</p>
                                    <textarea onChange={this.handleText} id="textarea" type="text" placeholder="Расскажите ваши мысли здесь..."  className={this.state.validated == true ? "group-post-input" : "group-post-input-invalid"}  />

                            </form>
                            <button onClick={this.sendPost} type="submit" className="group-post-send" >Отправить</button>
                            <label className="group-post-send group-add-file">
                            <input onChange={this.getFile} type="file" id="post-photo-input" accept=".jpg, .png, .jpeg"/>
                            Прикрепить
                            </label>  
            </div>
          );
    }
}
 
export default GroupsPostModal;
