import React, { Component } from 'react'
import './GroupParticipants.css';

class GroupParticipants extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const status = this.props.online === false || this.props.online === "false" ? <div className="friend-offline"></div> : <div className="friend-online"></div>
        return (
            
				<div className="friend participant">
                    <div className="friend-info">
                        <div className="ava participant-photo">{this.props.avatar != '' ? <img src={this.props.avatar} className="friend-avatar"/> : null }</div>
                        <div className="ava-devisor photo-gap">
                        <div className="friend-name participant-name">
                            {this.props.name}
                            {status}
                        </div>
                    </div>
                    <button  type="button" className="delete-friend">Забанить</button>
                    </div>
                    
				</div>
        )
    }
}
 
export default GroupParticipants;
