import React from 'react';
import './ProfilePhoto.css';

class ProfilePhoto extends React.Component{
    render() {
        return (
            <div className="profile-photo-container">
                <div className="profile-photo"></div>
                <label class="profile-btn">
                    <input type="file"  accept=".jpg, .png, .jpeg"/>
                    Изменить
                </label>
            </div>
        );
    }
}

export default ProfilePhoto;