import React from 'react';
import './ChatAddForm.css';
import Friend from '../../../friends/components/Friend/Friend';
class ChatAddForm extends React.Component {
  constructor(props){
      super(props);
      this.state={friends: []}
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
getFriends = async () => {
    await this.getData(`https://inversedevs.herokuapp.com/friends/${window.localStorage.getItem('id')}`)
    .then(data => {
        this.setState({friends: data.friends}); 
    })
   
}
createChat = async () => {
     
    let ids = [];
    ids.push(window.localStorage.getItem('id'));
    ids.push(this.props.id);
    await this.postData('https://inversedevs.herokuapp.com/chat/create', {users: ids})

}
componentDidMount(){
    this.getFriends();
    setInterval(this.getFriends,2000);
}
renderFriends(friends) {

    return Object.values(friends).map((friend,id) => <Friend getShow={this.props.getShow} avatar={friend.avatar} onClick={this.createChat} online={friend.online} key={id} name={friend.name} id={friend.id}/>)
}
  render()
  {
      const friends = this.renderFriends(this.state.friends);
      return (
        <div className="friends-list">
            {friends}
        </div>
      )
  }
}
export default ChatAddForm;
