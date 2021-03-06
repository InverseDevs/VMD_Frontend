import React from 'react'
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfileComments.css';
class ProfileComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            sender: '',
            valChanged: 0,
            commentId: '',
            validated: true,
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
            var regexp =/^[\u0020-\u007F]*$/i;
            if(!regexp.test(e.target.value)) {
               this.setState({validated: false})
            }else{
              this.setState({validated: true})
            }
            this.setState({comment: `${e.target.value}`});
            if (this.state.valChanged === 0){
                document.getElementById('comments-textarea').value = `${this.state.sender}, ${e.target.value}`;
                this.setState({valChanged: 1})
            }
            else{
                document.getElementById('comments-textarea').value = e.target.value;
            }
        }
        else{
            var regexp = /^[\u0020-\u007F]*$/i;
            if(!regexp.test(e.target.value)) {
               this.setState({validated: false})
            }else{
              this.setState({validated: true})
            }
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
        if (this.state.validated == true){
        e.preventDefault();
        if (this.state.sender === ''){
        await this.postData(`https://inversedevs.herokuapp.com/comment/post/${this.props.Postid}`,
        {   sender: window.localStorage.getItem('username'),
            content: this.state.comment,
            picture: '',
         }).then(data => {
            document.getElementById('comments-textarea').value = '';
        this.setState({valChanged:0})}
            )
        }
         else{

            await this.postData(`https://inversedevs.herokuapp.com/comment/comment/${this.state.commentId}`,
            {   sender: window.localStorage.getItem('username'),
                content: this.state.comment,
                picture: '',
             }).then(data => {
                document.getElementById('comments-textarea').value = '';
            this.setState({valChanged: 0})})
         }
         document.getElementById('comments-textarea').value = '';
        }
       }
       renderItems(comments){
        if (comments){
        return Object.values(comments).map(comment => {
                return (
                    <ProfileComment name={comment.sender.name} avatar={comment.sender.avatar} senderId={comment.sender.id} commentId={comment.id} setCommentId={this.setCommentId} setSender={this.setSender} innerComments={comment.comments} text={comment.content} key={comment.id} likes={comment.likes} date={comment.sent_time} />
                )
        })};
    }
    render() {
        const items = this.renderItems(this.props.comments);
        return (
            <div className="comments-section">
                <p className="comments-header">Комментарии</p>
                {items}
                <form className="comment-form">
                    <p className="check-email">{this.state.validated == true ? null : 'Пока Very Magic Duck не поддерживает русский язык'}</p>
                    <textarea onChange={this.handleCommentChange} id="comments-textarea" className={this.state.validated == true ? "comment-input" : "comment-input-invalid"} placeholder="Введите текст"/>
                    <button onClick={this.sendComment} className="comment-reply-btn">Ответить</button>
                </form>
            </div>
        )
    }
}

export default ProfileComments;
