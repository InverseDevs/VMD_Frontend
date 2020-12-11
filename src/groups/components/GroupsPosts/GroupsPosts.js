import React, { Component } from 'react'
import './GroupsPosts.css';
import GroupsPost from '../GroupsPost/GroupsPost';
class GroupsPosts extends Component {
    constructor(props) {
        super(props);
    }
    renderPosts =(posts)=>{
        return Object.values(posts).map((post,i)=><GroupsPost key={i} sender={post.sender.name} senderId={post.sender.id} avatar={post.sender.avatar} photo={post.picture} id={post.id} content={post.content} sent_time={post.sent_time}
                                        likes={post.likes} comments={post.comments} />)
    }
    render() { 
        const items = this.renderPosts(this.props.posts);
        return ( <div className="group-posts">
                {items}
    </div> );
    }
}
 
export default GroupsPosts;
