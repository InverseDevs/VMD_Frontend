import React from 'react';
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfilePostComments.css';
class ProfilePostComments extends React.Component {
  
  render() {
    
    return (
    
<div className="comments-post-section">
      <p className="comments-header">Комментарии</p>
      <hr className="break-line"/>
      <ProfileComment/>
    <ProfileComment />
    <form className="comment-form">
        <textarea  id="post-textarea" className="comment-post-input" placeholder="Введите текст"/>
        <button  className="comment-reply-post-btn">Ответить</button>
    </form>
    </div>)
  }
}

export default ProfilePostComments;