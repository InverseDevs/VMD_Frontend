import React, { Component } from 'react'
import './GroupsPost.css';
import ProfileCommentsModal from '../ProfileCommentsModal/ProfileCommentsModal';
import Comments from '../ProfileComments/ProfileComments';
import ProfilePostModal from '../ProfilePostModal/ProfilePostModal';
import ProfilePostComments from '../ProfilePostComments/ProfilePostComments';
class GroupsPost extends Component {
    constructor(props) {
        super(props);
        this.state={showComments: false,
                    showPost: false,}
    }
    showCommentsModal = () => {
        this.setState({showComments: true})
    }
    hideCommentsModal = () => {
        this.setState({showComments:false})
    }
    showPostModal = () => {
        this.setState({showPost: true})
    }
    hidePostModal = () => {
        this.setState({showPost:false})
    }
    render() { 
        return ( 
            <div className="profile-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <div className="like-number">1</div>
                        <button  className="profile-post-like"><img className="post-like" /></button>
                        <button onClick={this.showCommentsModal} className="profile-post-comments">Комментарии</button>
                        <button className="profile-post-comments" >Удалить</button>
                        <h6 className="post-time">5 дней назад</h6>
                        <div className="post-author">Ник</div>
                        <ProfileCommentsModal show={this.state.showComments} handleClose={this.hideCommentsModal}>
                            <Comments />
                    </ProfileCommentsModal>
                    </div>
                    <div className="user-img"></div>
                </div>
                <img className="post-img"/>
                <h6 className="post-text">контент</h6>
                <button className="post-readmore" onClick={this.showPostModal}>Подробнее</button>
                <ProfilePostModal show={this.state.showPost} handleClose={this.hidePostModal}>
                        <div className="profile-full-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <div className="like-number">1</div>
                        <button className="profile-post-like"><img className="post-like" /></button>
                        <button className="profile-post-comments" >Удалить</button>
                        <h6 className="post-full-time">5 дней назад</h6>
                        <div className="post-full-author">Ник</div>
                    </div>
                    <div className="user-full-img"></div>
                </div>
                <img className="post-img"/>
                <h6 className="post-full-text">контент</h6>
                <ProfilePostComments />
                </div>
                    </ProfilePostModal>
            </div>
         );
    }
}
 
export default GroupsPost;