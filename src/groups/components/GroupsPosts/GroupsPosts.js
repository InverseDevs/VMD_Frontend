import React, { Component } from 'react'
import './GroupsPosts.css';
import GroupsPost from '../GroupsPost/GroupsPost';
class GroupsPosts extends Component {
    constructor(props) {
        super(props);
    }
    renderPosts =(posts)=>{
        console.log(posts)
        return Object.values(posts).map((post,i)=><GroupsPost key={i} sender={post.sender} photo={post.picture} id={post.id} content={post.content} sent_time={post.sent_time}
                                        likes={post.likes} comments={post.comments} />)
    }
    render() { 
        const items = this.renderPosts(this.props.posts);
        console.log(items)
        return ( <div className="group-posts">
                {items}
    </div> );
    }
}
 
export default GroupsPosts;
