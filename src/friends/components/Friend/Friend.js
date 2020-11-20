import React from 'react';
import './Friend.css';
import {Link} from 'react-router-dom';
class Friend extends React.Component {
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
    deleteFriend = async (e) => {
        e.preventDefault();
        await this.postData(`https://inversedevs.herokuapp.com/friends/remove/${this.props.id}`, {id: window.localStorage.getItem('id')})
        .then(res => {console.log(res)
            
        });
    }
    render(){
        const status = this.props.online === false || this.props.online === "false" ? <div className="friend-offline"></div> : <div className="friend-online"></div>
        return (
				<div className="friend">
                    <div className="friend-info">
                        <div className="ava"></div>
                        <div className="ava-devisor">
                        <div className="friend-name">
                            <Link to={`/profile/${this.props.id}`}>{this.props.name}</Link>
                            {status}
                        </div>
                        <button type="button" className="write-message-btn">Написать сообщение</button>
                    </div>
                    <button type="button" onClick={this.deleteFriend} className="delete-friend">Удалить</button>
                    </div>
                    
				</div>
        )
    }
}
export default Friend;