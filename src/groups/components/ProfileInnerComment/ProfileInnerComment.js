import React from 'react'
import {Link} from 'react-router-dom';
import './ProfileInnerComment.css';
import close from './close.png';
import like from './heart.svg';
import liked from './heart_clicked.svg';
class ProfileInnerComment extends React.Component {
    constructor(props){
        super(props);
        this.state={like:false};
    }
    postData = async (url,data) => {
      const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Authorization' : `${window.localStorage.getItem('token')}`
          }
      });
      return await res.json();
  } 
  
  likeComment = async (e) => {
      e.preventDefault();
      await this.postData(`https://inversedevs.herokuapp.com/like/comment/${this.props.commentId}`,
      {   userId: `${window.localStorage.getItem('id')}`
       }).then(data => {
      if (data.status === 'added' || data.status === 'removed'){
        this.setState({like: !this.state.like});
      }
    
    })
     }
     postDeleteData = async (url) => {
      const res = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization' : `${window.localStorage.getItem('token')}`
          }
      });
      return await res.json();
  } 
     deleteComment = async (e) => {
      e.preventDefault();
      await this.postDeleteData(`https://inversedevs.herokuapp.com/comment/delete/${this.props.commentId}`)

     }
    onUserClick = ()=>{
        this.props.setSender(this.props.name);
        this.props.setCommentId(this.props.commentId);
        this.props.getInnerPressed(true)
    }
    renderItems(comments){
      if(comments){
      return Object.values(comments).map(comment => {
              return (
                  <ProfileInnerComment commentId={comment.id} setCommentId={this.props.setCommentId} setSender={this.props.setSender} text={comment.content} key={comment.id} likes={comment.likes} name={comment.sender} date={comment.sent_time} />
              )
             

      });
    }
  }
  checkLike = (likes) => {
    likes = Object.values(likes);
    for (let i = 0; i < likes.length; ++i){
        if (likes[i].id == window.localStorage.getItem('id')){
            return true
        }  
    }
    return false
  }
    render() {
      const items = this.renderItems(this.props.comments);
        return (
        <div className={this.props.secondary === true ? 'secondary-comment' : 'comment'}>
          <div className="comment-container">
          
          <Link to={`/profile/${this.props.senderId}`}>{this.props.avatar != ''? <img src={this.props.avatar} className="comment-img-exists" alt="avatar"/> : <div className="comment-img"></div>}</Link>
          <div className="comment-body">
            <div className="comment-info">
            <Link to={`/profile/${this.props.senderId}`} className="comment-profile-link">{this.props.name}</Link>
            <div className="like-number-comms">{Object.values(this.props.likes).length}</div>
            <button className="like" onClick={this.likeComment}><img className="post-like" src={ this.checkLike(this.props.likes) === false ? like : liked}/></button>
            <p className="comment-date">
              {this.props.date}
            </p>
            
            <button className="delete" onClick={this.deleteComment}><img src={close} className="delete-comment"/></button>
            </div>
            <p className="comment-text">{this.props.text}</p>
            <p onClick={this.onUserClick} className="comment-reply">Ответить</p>
            </div>
          </div>
          {items}
        </div>
        )
    }
}

export default ProfileInnerComment;
