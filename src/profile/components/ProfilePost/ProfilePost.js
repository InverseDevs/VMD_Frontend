import React from 'react';
import './ProfilePost.css';
import like from './heart.svg';
import likeClicked from './heart_clicked.svg';
import ProfilePostModal from '../ProfilePostModal/ProfilePostModal';
import ProfileCommentsModal from '../ProfileCommentsModal/ProfileCommentsModal';
import Comments from '../ProfileComments/ProfileComments';
import PostComments from '../ProfilePostComments/ProfilePostComments';
class ProfilePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            showComments:false,
            showPost: false,
        }
    }
    likePressed =() => {
        this.setState({liked: !this.state.liked})
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
    render() {
        return(
            <div className="profile-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <button onClick={this.likePressed} className="profile-post-like"><img className="post-like" src={this.state.liked === false ? like : likeClicked}/></button>
                        <button onClick={this.showCommentsModal} className="profile-post-comments">Комментарии</button>
                        <ProfileCommentsModal show={this.state.showComments} handleClose={this.hideCommentsModal}>
                            <Comments/>
                    </ProfileCommentsModal>
                    </div>
                    <div className="user-img"></div>
                </div>
                <div className="post-img"></div>
                <h6 className="post-text">Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.</h6>
                <button className="post-readmore" onClick={this.showPostModal}>Подробнее</button>
                <ProfilePostModal show={this.state.showPost} handleClose={this.hidePostModal}>
                        <div className="profile-full-post">
                <div className="profile-post-header">
                    <div className="profile-post-header-left">
                        <button onClick={this.likePressed} className="profile-post-like"><img className="post-like" src={this.state.liked === false ? like : likeClicked}/></button>
                    </div>
                    <div className="user-full-img"></div>
                </div>
                <div className="post-full-img"></div>
                <h6 className="post-full-text">Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.</h6>
                <h6 className="post-full-text">Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.</h6>
                <PostComments/>
                </div>
                    </ProfilePostModal>
            </div>
        );
    }
}

export default ProfilePost;