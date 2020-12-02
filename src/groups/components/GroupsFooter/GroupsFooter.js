import React, { Component } from 'react'
import './GroupsFooter.css';
import GroupsPosts from '../GroupsPosts/GroupsPosts';
class GroupsFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( <div className="group-footer">
            <GroupsPosts/>
        </div>  );
    }
}
 
export default GroupsFooter;