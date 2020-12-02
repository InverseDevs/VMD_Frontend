import React, { Component } from 'react'
import './GroupsPosts.css';
import GroupsPost from '../GroupsPost/GroupsPost';
class GroupsPosts extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( <div className="group-posts">
            <GroupsPost/>
            <GroupsPost/>
    </div> );
    }
}
 
export default GroupsPosts;