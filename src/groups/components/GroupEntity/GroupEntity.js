import React, { Component } from 'react';
import './GroupEntity.css';

class GroupEntity extends Component {
    constructor(props) {
        super(props);
    }
    groupOpen = ()=>{
        this.props.setGroupClick();
        this.props.getGroupInfo(this.props.id);
    }
    render() { 
        return ( 
            <div className="group-entity">
                <div className="group-avatar"></div>
                <div className="group-name">
                    {this.props.name}
                </div>
                <button onClick={this.groupOpen} className="group-btn">Перейти</button>
            </div>
         );
    }
}
 
export default GroupEntity;