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
       }).then(data => {console.log(data)
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
      await this.postDeleteData(`https://inversedevs.herokuapp.com/comment/delete/${this.props.commentId}`).then(data => console.log(data)
    
    )
     }
    onUserClick = ()=>{
        this.props.setSender(this.props.name);
        this.props.setCommentId(this.props.commentId);
    }
    render() {
        return (
        <div className={this.props.secondary === true ? 'secondary-comment' : 'comment'}>
          <div className="comment-img"></div>
          {/* <img src={this.props.img} className="comment-img"/> */}
          <div className="comment-body">
            <div className="comment-info">
            <Link to="/" className="comment-profile-link">{this.props.name}</Link>
            <button className="like" onClick={this.likeComment}><img className="post-like" src={this.state.like === true? liked : like}/></button>
            <p className="comment-date">
              {this.props.date}
            </p>
            
            <button className="delete" onClick={this.deleteComment}><img src={close} className="delete-comment"/></button>
            </div>
            <p className="comment-text">{this.props.text}</p>
            <p onClick={this.onUserClick} className="comment-reply">Ответить</p>

          </div>
        </div>
        )
    }
}

export default ProfileInnerComment;