import React from 'react';
import './FriendsApp.css';
import User from '../User/User';
import Friend from '../Friend/Friend';
import logo from './logo.png';
import {Link} from 'react-router-dom';
class FriendsApp extends React.Component {
	constructor(props) {
		super(props);
		this.state={tabId: 0,
		friends: [],
		users: [],
		search: ''}
	}
	getData = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
    getFriends = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/friends/${window.localStorage.getItem('id')}`)
        .then(data => {
			this.setState({friends: data.friends}); 
			console.log(data);
        })
       
	}
	getUsers = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/api/users`)
        .then(data => {
			this.setState({users: data}); 
			console.log(data);
        })
       
    }
	SwitchOnline = () => {
		this.setState({tabId : 1})
	}
	SwitchSearch = () => {
		this.setState({tabId : 2})
	}
	SwitchAll = () => {
		this.setState({tabId : 0})
	}
	componentDidMount(){
		this.getUsers();
		this.getFriends();
	}
	searchChange = (e) => {this.setState({search:e.target.value})};
	checkId = (id ) => {
		return window.localStorage.getItem('id') === id;
	}
	renderItems(users){
	return Object.values(users).map((user,idx) => user.id != window.localStorage.getItem('id') ? <User online={user.online} key={idx} id={user.id} name={user.name} /> : null );
	}	
	renderFriends(friends) {
		return Object.values(friends).map((friend,id) => <Friend online={friend.online} key={id} name={friend.name} id={friend.id}/>)
	}
	renderOnline(users){
		return Object.values(users).map((user,idx) => user.id != window.localStorage.getItem('id') && (user.online === "true" || user.online === true) ? <User online={user.online} key={idx} id={user.id} name={user.name} /> : null );
	}
	findUsers = () => {
		let	foundUsers = [];
		let users = Object.values(this.state.users);
		let friends = Object.values(this.state.friends)
		foundUsers = users.filter(user => (user.name.includes(this.state.search) || user.name.toLowerCase().includes(this.state.search)) && !friends.includes(user))
		return Object.values(foundUsers).map((user,idx) => user.id != window.localStorage.getItem('id') ? <User online={user.online} key={idx} id={user.id} name={user.name} /> : null )
	}
    render(){
		const items = this.renderItems(this.state.users);
		const friends = this.renderFriends(this.state.friends);
		const online = this.renderOnline(this.state.friends);
		const foundUsers = this.findUsers();
		return (
        <div className="friends-app">
		<Link to={`/profile/${window.localStorage.getItem('id')}`}><img src={logo} id="friends-logo" alt="logo"/></Link>
		<div id="friends-left-ellipse"></div>
		<div id="friends-right-ellipse"></div>
		<div id="friends-small-ellipse-1"></div>
		<div id="friends-small-ellipse-2"></div>
		<div id="friends-small-ellipse-3"></div>
		<div id="friends-small-ellipse-4"></div>

	<div className="friends-app-window">
			<div className="btn-group">
				<button onClick={this.SwitchAll} type="button" className="all-friends-btn">Все друзья</button>
				<button onClick={this.SwitchOnline} type="button" className="online-friends-btn">Друзья онлайн</button>
                <button onClick={this.SwitchSearch} type="button" className="all-friends-btn">Поиск</button>
			</div>
			{this.state.tabId === 2 ? <div className="search-input">
										<input className="search-input" onChange={this.searchChange} type="text" placeholder="Введите имя..."/>
										<button onClick={this.findUsers} className="search-btn">Искать</button>
									</div>
			 : null}
			<div className="friends-container">
				{this.state.tabId === 2 ? foundUsers ? foundUsers : items : this.state.tabId === 1 ? online : friends}
				
			</div>
	</div>
    </div> )
    }
}
export default FriendsApp;