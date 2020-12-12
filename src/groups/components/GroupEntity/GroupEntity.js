import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './GroupEntity.css';

class GroupEntity extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return ( 
            <div className="group-entity">
            {this.props.avatar != '' ? <img src={this.props.avatar} className="group-avatar-exists" alt="group-picture"/> : <div className="group-avatar"></div>}
            
                <div className="group-name">
                    {this.props.name}
                </div>
                <Link to={`/groups/${this.props.link}`}><button className="group-btn">Перейти</button></Link>
            </div>
         );
    }
}
 
export default GroupEntity;
