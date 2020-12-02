import React from 'react'
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfileComments.css';
class ProfileComments extends React.Component {
   
    render() {
        return (
            <div className="comments-section">
                <p className="comments-header">Комментарии</p>
                <ProfileComment />
                <ProfileComment />
                <form className="comment-form">
                    <textarea  id="comments-textarea" className="comment-input" placeholder="Введите текст"/>
                    <button  className="comment-reply-btn">Ответить</button>
                </form>
            </div>
        )
    }
}

export default ProfileComments;