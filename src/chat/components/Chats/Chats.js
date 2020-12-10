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
            this.setState({groups:data.chats})
        })
       
    }
    checkUsers = (groups,users) => {
           for (let i = 0; i < groups.length; ++i){
                if (groups[i].users == users){
                 return true;   
                }
           }
        return false;
    }
    renderGroups = (groups)=>{
        console.log(groups)
        return groups.map((group,i) => this.checkUsers(groups,group.users) == false ? <ChatGroup getMessages={this.props.getMessages} addTab={this.props.addTab} getInfo={this.props.getInfo} key={i} id={group.chat_id} users={group.users}/> : null );
    }
    componentDidMount() {
        this.getChats();

}
    render(){
    const groups = this.renderGroups(this.state.groups);
    console.log('groups',this.state.groups);
    console.log('Object',Object.values(this.state.groups));
    console.log('rendered',groups);
    return (
        
        <div className="chats">
            <SimpleBarReact style={{maxHeight: 700}}>
                <div className="chat-group-container">
                    <div className="chat-group-scroll">
                        {groups}
                    </div>
                </div>
            </SimpleBarReact>

            <ChatAdd show={this.props.show} getShow={this.props.getShow} />

        </div>
    );
}
}

export default Chats;
