import React from 'react';
import './ProfilePost.css';
import like from './heart.svg';
import likeClicked from './heart_clicked.svg';
import ProfilePostModal from '../ProfilePostModal/ProfilePostModal';
import ProfileCommentsModal from '../ProfileCommentsModal/ProfileCommentsModal';
import Comments from '../ProfileComments/ProfileComments';
import PostComments from '../ProfilePostComments/ProfilePostComments';
import {Link} from 'react-router-dom';
class ProfilePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            showComments:false,
            showPost: false,
        }
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
    
    deletePost = async () => {

        await this.postData(`https://inversedevs.herokuapp.com/post/delete/${this.props.Postid}`,
        {sender: this.props.sender,
            content: this.props.content
         })
       }
    likePressed = async () => {
        await this.postData(`https://inversedevs.herokuapp.com/like/post/${this.props.Postid}`,
        {
            userId: window.localStorage.getItem('id')
         })
         .then(data => console.log(data))
    }
    showCommentsModal = () => {
        this.setState({ showComments: true });
      };
    
      hideCommentsModal = () => {
        this.setState({ showComments: false });
      };
      showPostModal = () => {
        this.setState({ showPost: true });
      };
    
      hidePostModal = () => {
        this.setState({ showPost: false });
      };
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
        return(
            <div className="profile-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <div className="like-number">{Object.values(this.props.likes).length}</div>
                        <button onClick={this.likePressed} className="profile-post-like"><img className="post-like" src={ this.checkLike(this.props.likes) === false ? like : likeClicked}/></button>
                        <button onClick={this.showCommentsModal} className="profile-post-comments">Комментарии</button>
                        <button className="profile-post-comments" onClick={this.deletePost}>Удалить</button>
                        <Link to=`/profile/${this.props.senderId}`><div className="profile-post-author">{this.props.name}</div></Link>
                        <ProfileCommentsModal show={this.state.showComments} handleClose={this.hideCommentsModal}>
                            <Comments comments={this.props.comments} token={this.props.token} sender={this.props.name} Postid={this.props.Postid}/>
                    </ProfileCommentsModal>
                    </div>
                    <Link to=`/profile/${this.props.senderId}`>{this.props.avatar != '' ? <img src={this.props.avatar} className="post-avatar" alt="avatar"/> : <div className="user-img"></div>}</Link>
                </div>
                {this.props.photo !== ''  ? <img src={this.props.photo} className="post-img"/> : null}
                <h6 className="post-text">{this.props.content}</h6>
                <button className="post-readmore" onClick={this.showPostModal}>Подробнее</button>
                <ProfilePostModal show={this.state.showPost} handleClose={this.hidePostModal}>
                        <div className="profile-full-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <div className="like-number">{Object.values(this.props.likes).length}</div>
                        <button onClick={this.likePressed} className="profile-post-like"><img className="post-like" src={ this.checkLike(this.props.likes) === false ? like : likeClicked}/></button>
                        <button className="profile-post-comments" onClick={this.deletePost}>Удалить</button>
                        <h6 className="post-full-time">{this.props.time}</h6>
                        <Link to=`/profile/${this.props.senderId}`><div className="profile-post-full-author">{this.props.name}</div></Link>
                    </div>
                   <Link to=`/profile/${this.props.senderId}`>{this.props.avatar != '' ? <img src={this.props.avatar} className="post-avatar" alt="avatar"/> :  <div className="user-img"></div>}</Link>
                </div>
                {this.props.photo !== '' ? <img src={this.props.photo} className="post-img"/> : null}
                <h6 className="post-full-text">{this.props.content}</h6>
                <PostComments comments={this.props.comments} token={this.props.token} sender={this.props.name} Postid={this.props.Postid} id={this.props.id}/>
                </div>
                    </ProfilePostModal>
            </div>
        );
    }
}

export default ProfilePost;
