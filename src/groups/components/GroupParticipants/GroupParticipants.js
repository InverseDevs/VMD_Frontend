import React, { Component } from 'react'
import './GroupParticipants.css';

class GroupParticipants extends Component {
    constructor(props) {
        super(props);
    }
	makeAdmin = async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/admin/add/${this.props.groupId}`,{user_id: this.props.id})
        .then(data => console.log(data))
    }
	deleteAdmin = async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/admin/remove/${this.props.groupId}`,{user_id: this.props.id})
        .then(data => console.log(data))
    }
	banUser= async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/ban/${this.props.groupId}`,{user_id: this.props.id})
        .then(data => console.log(data))
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
                        <div className="participant-photo-container">
	{this.props.avatar != '' ? <img src={this.props.avatar} className="participant-photo"/> : <div className="no-photo"></div> }
	    		</div>
                        <div className="participant-name">
				<div className="part-name">
                            {this.props.name}</div>
	      </div>
                            {status}
                      <button onClick={this.makeAdmin} className="delete-friend make-admin">Сделать администратором</button>
                    <button onClick={this.banUser} className="delete-friend ban-user">Забанить</button>
                    
				</div>
        )
    }
}
 
export default GroupParticipants;
