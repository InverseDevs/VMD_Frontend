import React from 'react';
import {Link} from 'react-router-dom';
class FriendRequest extends React.Component {
	constructor(props) {
        super(props);
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
    AddFriend = async (e) => {
        e.preventDefault();
        await this.postData(`https://inversedevs.herokuapp.com/friends/accept/${this.props.id}`, {id: window.localStorage.getItem('id')})
    }

    DeclineFriend = async (e) => {
        e.preventDefault();
        await this.postData(`https://inversedevs.herokuapp.com/friends/decline/${this.props.id}`, {id: window.localStorage.getItem('id')})

    }

    render(){
        const status = this.props.online === false || this.props.online === "false" ? <div className="friend-offline"></div> : <div className="friend-online"></div>
        return (
				<div className="friend">
                    <div className="friend-info">
                          {this.props.avatar != '' ? <img src={this.props.avatar} className="friend-avatar" alt="avatar" /> :<div className="ava"></div> } 
                        <div className="ava-devisor">
                        <div className="friend-name">
                            <Link to={`/profile/${this.props.id}`}>{this.props.name}</Link>
                            {status}
                        </div>
                        <button type="button" className="write-message-btn">Написать сообщение</button>
                    </div>
		    <button type="button" onClick={this.AddFriend} className="refuse-friend">Принять</button>
                    <button type="button" onClick={this.DeclineFriend} className="refuse-friend">Отклонить</button>

                    </div>
                    
				</div>
        )
    }
}
export default FriendRequest;
