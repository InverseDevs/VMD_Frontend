import React from 'react';

import ChatGroup from '../ChatGroup/ChatGroup';
import ChatAdd from '../ChatAdd/ChatAdd';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import './Chats.css';

class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            groups: []
        }
    }
    getData = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
             mode: 'cors',
            headers: {
                'Authorization' : `${window.localStorage.getItem('token')}`
            }

        });
        return await res.json();
    } 
    getChats = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/chats/${window.localStorage.getItem('id')}`)
        .then(data => {
            console.log(data);
            this.setState({groups:data})
        })
       
    }
    renderGroups = (groups)=>{
        return Object.values(groups).map((group,i) => <ChatGroup key={i} id={group.chat_id} users={group.users}/> );
    }
    componentDidMount() {
        this.getChats();
}
    render(){
    const groups = this.renderGroups(this.state.groups);
    return (
        
        <div className="chats">
            <SimpleBarReact style={{maxHeight: 700}}>
                <div className="chat-group-container">
                    <div className="chat-group-scroll">
                        {groups}
                    </div>
                </div>
            </SimpleBarReact>
            <ChatAdd addGroup={this.props.addGroup}/>
        </div>
    );
}
}

export default Chats;
