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
                        {this.props.avatar != '' ? <img src={this.props.avatar} className="participant-photo"/> : <div className="no-photo"></div> }
                        <div className="participant-name">
                            {this.props.name}
                            {status}
                        </div>
                    <button  type="button" className="delete-friend">Забанить</button>
                    
				</div>
        )
    }
}
 
export default GroupParticipants;
