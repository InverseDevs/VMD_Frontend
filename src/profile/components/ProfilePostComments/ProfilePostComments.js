import React from 'react';
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfilePostComments.css';
const ProfilePostComments = () => {
  return (<div className="comments-post-section">
      <p className="comments-header">Комментарии</p>
      <hr className="break-line"/>
    <ProfileComment img='https://react.semantic-ui.com/images/avatar/small/matt.jpg' name="Matt" date="Today at 5:42PM" text="How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!" />
    <ProfileComment img="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" name="Elliot Fu" date="Yesterday at 12:30AM" text="This has been very useful for my research. Thanks as well!"/>
    <ProfileComment secondary img="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" name="Jenny Hess" date="Just now" text="Elliot you are always so right :)"/>
    <ProfileComment img="https://react.semantic-ui.com/images/avatar/small/joe.jpg" name="Joe Henderson" date="5 days ago" text="Dude, this is awesome. Thanks so much"/>
    <form className="comment-form">

        <textarea className="comment-post-input" placeholder="Введите текст"/>

        <button className="comment-reply-post-btn">Ответить</button>
    </form>
    </div>)
}

export default ProfilePostComments;