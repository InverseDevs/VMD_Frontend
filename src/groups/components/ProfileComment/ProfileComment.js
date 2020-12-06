import React from 'react'
import {Link} from 'react-router-dom';
import './ProfileComment.css';
import close from './close.png';
import like from './heart.svg';
import liked from './heart_clicked.svg';
import ProfileInnerComment from '../ProfileInnerComment/ProfileInnerComment';
class ProfileComment extends React.Component {
    constructor(props){
        super(props);
        this.state={like:false,comment: '',
        sender: '',
        innerPressed: false};
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
  getInnerPressed = (state)=>{
    this.setState({innerPressed: state})
  }
  likeComment = async (e) => {
      e.preventDefault();
      await this.postData(`https://inversedevs.herokuapp.com/like/comment/${this.props.commentId}`,
      {   userId: `${window.localStorage.getItem('id')}`
       }).then(data => {console.log(data)
      if (data.status === 'added' || data.status === 'removed'){
        this.setState({like: !this.state.like});
      }
    
    })
     }
     deleteComment = async (e) => {
      e.preventDefault();
      await this.postData(`https://inversedevs.herokuapp.com/comment/delete/${this.props.commentId}`,
      {   userId: `${window.localStorage.getItem('id')}`
       }).then(data => console.log(data)
    
    )
     }
    onUserClick = ()=>{
      if (this.state.innerPressed === false){
        this.props.setSender(this.props.name);
        this.props.setCommentId(this.props.commentId);
      }
      else{
        this.props.setSender(this.state.sender);
        this.props.setCommentId(this.props.commentId)
      }
    }
    renderItems(comments){
      if(comments){
      return Object.values(comments).map(comment => {
              return (
                  <ProfileInnerComment getInnerPressed={this.getInnerPressed} commentId={comment.id} setCommentId={this.props.setCommentId} comments={comment.comments} setSender={this.props.setSender} text={comment.content} key={comment.id} likes={comment.likes} avatar={comment.sender.avatar} name={comment.sender.name} date={comment.sent_time} />
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
        const items = this.renderItems(this.props.innerComments);
        return (
          <>
        <div className={this.props.secondary === true ? 'secondary-comment' : 'comment'}>
          <div className="comment-container">
          
          {this.props.avatar != ''?  <img src={this.props.avatar} className="comment-img" alt="avatar"/> : <div className="comment-img"></div>}
          <div className="comment-body">
            <div className="comment-info">
            <Link to="/" className="comment-profile-link">{this.props.name}</Link>
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
        </div>
        <div className="inner-comments">
        {items}
        {this.state.innerComms}
        </div>
        </>
        )
    }
}

export default ProfileComment;
