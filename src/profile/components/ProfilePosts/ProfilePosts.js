import React from 'react';
import ProfilePost from '../ProfilePost/ProfilePost';
import './ProfilePosts.css';
class ProfilePosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }
    getData = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
    getPosts = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/posts/${window.localStorage.getItem('id')}`)
        .then(data => {
            this.setState({posts: data}); 
        })
       
    }
    componentDidMount(){
        this.getPosts();
    }
    componentDidUpdate(){
        this.getPosts();
    }
    renderItems(posts){
        return Object.values(posts).map(post => {
                return (
                    <ProfilePost userId={window.localStorage.getItem('id')} token={window.localStorage.getItem('token')} Postid={post.id} key={post.id} sender={post.sender} content={post.content} time={post.sent_time}/>
                )
        });
    }
    
    render() {
        const {posts} = this.state;
        const items = this.renderItems(posts);
        return(
        <div className="profile-posts">
            {items}
        </div>
    );}
}

export default ProfilePosts;
