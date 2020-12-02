import React from 'react'
import './GroupsHeader.css';
import GroupsModal from '../GroupsModal/GroupsModal';
import GroupsPostModal from '../GroupsPostModal/GroupsPostModal';
import GroupParticipants from '../GroupParticipants/GroupParticipants';
import GroupBanned from '../GroupBanned/GroupBanned';
class GroupsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            show_participants:false,
            show_banned:false,
            show_post:false,
            searchMembers: '',
            searchBanned: '',
            postText: '',
        groupPhoto: '',
        }
    }
    getClosePost = () => {
           this.setState({show_post: false});
    }
    joinGroup = async() => {
        await this.postData(`https://inversedevs.herokuapp.com/group/join/${this.props.id}`, {user_id: window.localStorage.getItem('id')})
        .then(data => console.log(data))
    }
    leaveGroup = async () => {
        await this.postData(`https://inversedevs.herokuapp.com/group/leave/${this.props.id}`, {user_id: window.localStorage.getItem('id')})
        .then(data => console.log(data))
    }
    avatarGroup = async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/avatar/${this.props.id}`,{picture: this.state.groupPhoto})
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
    
    getFile = () => {
        var file = document.getElementById('photo-input').files[0];
        var img = document.createElement("img");
        img.file = file;
        img.width = 200;
        img.height = 240;
        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result;
        }; 
        })(img);
        reader.onloadend = () => {
            this.setState({groupPhoto: reader.result})
            this.avatarGroup();
          }
        reader.readAsDataURL(file);
      
    }
    membersChange= (event)=>{
        this.setState({searchMember:event.target.value});
    }
    bannedChange=(event) =>{
        this.setState({searchBanned:event.target.value});
    }
    showParticipants = () => {
        this.setState({ show_participants: true });
    };
    
    hideParticipants = () => {
        this.setState({ show_participants: false });
    };
    showBanned = () => {
        this.setState({ show_banned: true });
    };
    
    hideBanned = () => {
        this.setState({ show_banned: false });
    };
    showPost = () => {
        this.setState({ show_post: true });
    };
    
    hidePost = () => {
        this.setState({ show_post: false });
    };
    renderMembers =(members) => {
        if (members != []){
        let new_members = Object.values(members).filter(member =>this.state.searchMembers != ''? member.name.includes(this.state.searchMembers) || member.name.toLowerCase().includes(this.state.searchMember) : member)       
return Object.values(new_members).map((member,idx) => <GroupParticipants key={idx} avatar={member.avatar} name={member.name} status={member.online}/>)
                                              }
    else{
            return null
                                              }  
   }
    renderBanned = (banned) => {
            if (banned != []){
        let new_banned = Object.values(banned).filter(ban => this.state.searchBanned != '' ? ban.name.includes(this.state.searchBanned) || ban.name.toLowerCase().includes(this.state.searchBanned) : ban)
        return Object.values(new_banned).map((ban,idx) => <GroupBanned key={idx} avatar={ban.avatar} name={ban.name} status={ban.online} />)
                                             }
        else{
    return null;
                                             }
                                             }
    render() { 
        const members = this.renderMembers(this.props.members);
        const banned = this.renderBanned(this.props.banned);
        return ( 
            <div className="groups-header">
                
                <div className="left-header">
                    <GroupsModal show={this.state.show_participants} handleClose={this.hideParticipants}>
                            <div className="search-input">
                                <input className="search-input" onChange={this.membersChange} type="text" placeholder="Введите имя..."/>   
                            </div>
                            <div className="user-list">
                                {members}
                            </div>
                        
                    </GroupsModal>
                    <button onClick={this.showParticipants}  className="group-participants">Учатники</button>
                </div>
                <div className="middle-header">
                    <div className="group-header-name">
                        {this.props.name}
                    </div>
                    <div className={this.props.avatar != ''? "groups-header-image-exists" : "groups-header-image"}>
                            {this.props.avatar != ''? <img src={this.props.avatar} className="group-avatar" alt="group-avatar"/> : null}
                    </div>
                    <div className="group-buttons">
                    <label className="groups-change-avatar">
                    <input type="file" id="photo-input" onChange={this.getFile} accept=".jpg, .png, .jpeg"/>
                    Изменить
                </label>
                        <button className="groups-join">Вступить</button>
                        <GroupsModal show={this.state.show_post} handleClose={this.hidePost}>
                            <GroupsPostModal id={this.props.id} getClosePost={this.getClosePost}/>
                        </GroupsModal>
                        
                        <button onClick={this.showPost} className="groups-send-post">Оставить запись</button>
                    </div>
                </div>
                <div className="right-header">
                    <GroupsModal show={this.state.show_banned} handleClose={this.hideBanned}>
                            <div className="search-input">
                                    <input className="search-input" onChange={this.bannedChange} type="text" placeholder="Введите имя..."/>   
                                </div>
                                <div className="user-list">
                                    {banned}
                                </div>
                    </GroupsModal>
                    <button onClick={this.showBanned}  className="group-banned">Чёрный список</button>
                </div>
            </div>
         );
    }
}
 
export default GroupsHeader;
