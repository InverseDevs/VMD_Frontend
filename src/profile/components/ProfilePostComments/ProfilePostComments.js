import React from 'react';
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfilePostComments.css';
class ProfilePostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        comment: '',
        sender: '',
        valChanged: 0,
        commentId: '',
    }
}
setCommentId = (id) => {
    this.setState({commentId: id});
}
setSender = (username) => {
    this.setState({sender: username});
}
handleCommentChange = (e) => {
    if (this.state.sender !== ''){
        this.setState({comment: `${e.target.value}`});
        if (this.state.valChanged === 0){
            document.getElementById('post-textarea').value = `${this.state.sender}, ${e.target.value}`;
            this.setState({valChanged: 1})
        }
        else{
            document.getElementById('post-textarea').value = e.target.value;
        }
    }
    else{
    this.setState({comment: e.target.value})
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

sendComment = async (e) => {
    e.preventDefault();
    if (this.state.sender === ''){
    await this.postData(`https://inversedevs.herokuapp.com/comment/post/${this.props.Postid}`,
    {   sender: window.localStorage.getItem('username'),

        content: this.state.comment,
        picture: '',

     }).then(data => console.log(data))
    }
     else{
        await this.postData(`https://inversedevs.herokuapp.com/comment/comment/${this.state.commentId}`,
        {   sender: window.localStorage.getItem('username'),

            content: this.state.comment,
            picture: '',

         }).then(data => console.log(data))
     }
     document.getElementById('post-textarea').value = '';
   }
   renderItems(comments){
    if (comments){
    return Object.values(comments).map(comment => {
            return (
                <ProfileComment commentId={comment.id} setCommentId={this.setCommentId} setSender={this.setSender} innerComments={comment.comments} text={comment.content} key={comment.id} likes={comment.likes} name={comment.name} date={comment.sent_time} />
            )
    })};
}
  render() {
    const items = this.renderItems(this.props.comments);  
    return (
    
<div className="comments-post-section">
      <p className="comments-header">Комментарии</p>
      <hr className="break-line"/>
    {items}
    <form className="comment-form">
        <textarea onChange={this.handleCommentChange} id="post-textarea" className="comment-post-input" placeholder="Введите текст"/>
        <button onClick={this.sendComment} className="comment-reply-post-btn">Ответить</button>
    </form>
    </div>)
  }
}

export default ProfilePostComments;
