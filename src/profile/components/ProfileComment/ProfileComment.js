import React from 'react'
import {Link} from 'react-router-dom';
import './ProfileComment.css';
class ProfileComment extends React.Component {
    constructor(props){
        super(props);
    }
    onUserClick = ()=>{
        console.log('clicked text');
    }
    render() {
        return (
        <div className={this.props.secondary === true ? 'secondary-comment' : 'comment'}>
          <img src={this.props.img} className="comment-img"/>
          <div className="comment-body">
            <div className="comment-info">
            <Link to="/" className="comment-profile-link">{this.props.name}</Link>
            <p className="comment-date">
              {this.props.date}
            </p>
            </div>
            <p className="comment-text">{this.props.text}</p>
            <p onClick={this.onUserClick} className="comment-reply">Ответить</p>
          </div>
        </div>
        )
    }
}

export default ProfileComment;