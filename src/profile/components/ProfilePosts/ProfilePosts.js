import React from 'react';
import ProfilePost from '../ProfilePost/ProfilePost';
import './ProfilePosts.css';
class ProfilePosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            dataChanged: false,
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
        if (window.location.pathname === '/profile/undefined%7D')
        {
            window.location.pathname = `/profile/${window.localStorage.getItem('id')}`
        }
        await this.getData(`https://inversedevs.herokuapp.com/posts/${window.location.pathname.slice(9)}`)
        .then(data => {
            this.setState({posts: data}
               ); 
        })
       
    }
    componentDidMount(){
        if (window.localStorage.getItem('id') !=  ''){
        this.getPosts();
        }
    }
    componentDidUpdate(){
        if (window.localStorage.getItem('id') != ''){
    //    setInterval(() =>  this.getPosts(), 10000);
            this.getPosts();
        }
    
    }
    renderItems(posts){
        return Object.values(posts).map(post => {
                return (
                    <ProfilePost photo={post.picture} likes={post.likes} comments={post.comments} userId={window.localStorage.getItem('id')} token={window.localStorage.getItem('token')} Postid={post.id} key={post.id} sender={post.name} content={post.content} time={post.sent_time}/>
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
