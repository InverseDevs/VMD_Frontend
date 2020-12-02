import React from 'react'
import {Link} from 'react-router-dom';
import './ProfileInnerComment.css';
import close from './close.png';
import like from './heart.svg';
import liked from './heart_clicked.svg';
class ProfileInnerComment extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
        <div className={this.props.secondary === true ? 'secondary-comment' : 'comment'}>
          <div className="comment-container">
          <div className="comment-img"></div>
          {/* <img src={this.props.img} className="comment-img"/> */}
          <div className="comment-body">
            <div className="comment-info">
            Имя
            <div className="like-number-comms">1</div>
            <button className="like"><img className="post-like" /></button>
            <p className="comment-date">
              5 дней назад
            </p>
            
            <button className="delete" ><img src={close} className="delete-comment"/></button>
            </div>
            <p className="comment-text">текст</p>
            <p  className="comment-reply">Ответить</p>
            </div>
          </div>

        </div>
        )
    }
}

export default ProfileInnerComment;