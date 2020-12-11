import React, { Component } from 'react'
import './GroupBanned.css';

class GroupBanned extends Component {
    constructor(props) {
        super(props);
    }
	unbanUser= async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/unban/${this.props.groupId}`,{user_id: this.props.id, attempter_id: window.localStorage.getItem('id')})

    }
    postData = async (url,data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }
        });
        return res.json();
    } 
    render() { 
        const status = this.props.status === false || this.props.status === "false" ? <div className="part-offline"></div> : <div className="part-online"></div>
        return (
            
				<div className="friend participant">
                        <div className="participant-photo-container">{this.props.avatar != '' ? <img src={this.props.avatar} className="participant-photo"/> : <div className="no-photo"></div> }</div>
                        <div className="participant-name">
	      		    <div className="part-name">{this.props.name}</div>
	    		</div>
                            {status} 
	    {this.props.admin == true || this.props.owner == true ? <button onClick={this.unbanUser}  type="button" className="delete-friend">Разбанить</button> : null}
                    
				</div>
        )
    }
}
 
export default GroupBanned;
