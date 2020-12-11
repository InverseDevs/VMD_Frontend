import React from 'react';
import './ProfilePhoto.css';

class ProfilePhoto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            photo: null,
            dataChanged: false,
        };
    }
    getFile = () => {
        var file = document.getElementById('photo-input').files[0];
        var img = document.createElement("img");
        img.file = file;
        img.width = 200;
        img.height = 240;

        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result;
        }; 
        })(img);
        reader.onloadend = () => {
            this.setState({photo: reader.result})
            this.sendAvatar();
          }
        reader.readAsDataURL(file);
      
    }

    image64ToImage(base64) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = base64;
          image.onload = function() {
            resolve(this);
          };
          image.onerror = function() {
            reject(this);
          };
        });
    }
    imageToCanvas(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return canvas;
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
    sendAvatar = async () => {

        await this.postData(`https://inversedevs.herokuapp.com/avatar/${window.localStorage.getItem('id')}`, {avatar: this.state.photo})
        this.setState({dataChanged:true});
        this.props.getChanged(this.dataChanged);
        this.setState({dataChanged: false});
    }
    render() {
        return (
            <div className="profile-photo-container">
                {this.props.userData.avatar ? <img src={this.props.userData.avatar} className="profile-photo-ungray" id="photo"/> : <div className="profile-photo" id="photo"></div>}
                
                {this.props.userData.id == window.localStorage.getItem('id') ? <label className="profile-btn">
                    <input type="file" id="photo-input" onChange={this.getFile} accept=".jpg, .png, .jpeg"/>
                    Изменить
                </label> : null}
            </div>
        );
    }
}

export default ProfilePhoto;