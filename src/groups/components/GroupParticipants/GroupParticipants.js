import React, { Component } from 'react'
import './GroupParticipants.css';

class GroupParticipants extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const status = this.props.status === false || this.props.status === "false" ? <div className="part-offline"></div> : <div className="part-online"></div>
        return (
            
				<div className="friend participant">
                        <div className="participant-photo-container">
	{this.props.avatar != '' ? <img src={this.props.avatar} className="participant-photo"/> : <div className="no-photo"></div> }
	    		</div>
                        <div className="participant-name">
				<div className="part-name">
                            {this.props.name}</div>
	      </div>
                            {status}
                      
                    <button  type="button" className="delete-friend">Забанить</button>
                    
				</div>
        )
    }
}
 
export default GroupParticipants;
