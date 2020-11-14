import React from 'react'
import ProfileComment from '../ProfileComment/ProfileComment';
import './ProfileComments.css';
class ProfileComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }
    }
    handleCommentChange = (e) => {
        this.setState({comment: e.target.value})
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
        await this.postData(`https://inversedevs.herokuapp.com/comment/post/${this.props.Postid}`,
        {   sender: this.props.sender,
            content: this.state.comment
         }).then(data => console.log(data))
       }
    render() {
        return (
            <div className="comments-section">
                <p className="comments-header">Комментарии</p>
                <ProfileComment img='https://react.semantic-ui.com/images/avatar/small/matt.jpg' name="Matt" date="Today at 5:42PM" text="How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!How artistic!" />
                <ProfileComment img="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" name="Elliot Fu" date="Yesterday at 12:30AM" text="This has been very useful for my research. Thanks as well!"/>
                <ProfileComment secondary img="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" name="Jenny Hess" date="Just now" text="Elliot you are always so right :)"/>
                <ProfileComment img="https://react.semantic-ui.com/images/avatar/small/joe.jpg" name="Joe Henderson" date="5 days ago" text="Dude, this is awesome. Thanks so much"/>
                <form className="comment-form">
                    <textarea onChange={this.handleCommentChange} className="comment-input" placeholder="Введите текст"/>
                    <button onClick={this.sendComment} className="comment-reply-btn">Ответить</button>
                </form>
            </div>
        )
    }
}

export default ProfileComments;