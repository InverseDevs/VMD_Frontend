import React, { Component } from 'react';
import './GroupsList.css';
import GroupEntity from '../GroupEntity/GroupEntity';
import GroupsModal from '../GroupsModal/GroupsModal';
class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state={
            search: '',
            groups: [],
            show: false,
            name: '',
            namedLink: '',
        }
    }
    handleNameChange= (event) => {
        this.setState({name: event.target.value});
    }
    handleNamedLinkChange=(event) => {
        this.setState({namedLink: event.target.value});
    }
    createGroup = async() =>{
        await this.postData(`https://inversedevs.herokuapp.com/group/create`,{name: this.state.name, named_link:this.state.namedLink, owner_id: window.localStorage.getItem('id')})
        .then(data => console.log(data))
        document.getElementById('group-name').value = '';
        document.getElementById('group-named-link').value = '';
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
    handleOpen = () => {
        this.setState({show : true})
    }
    handleClose = () => {
        this.setState({show: false})
    }
    searchOnChange = (event) => {
        this.setState({search: event.target.value})
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
    getGroups = async () => {
        await this.getData(`https://inversedevs.herokuapp.com/group/getGroupsByUser/${window.localStorage.getItem('id')}`)
        .then(data => {
		console.log(data);
		console.log('groups',data.groups)
			this.setState({groups: data.groups}); 
        })
       
    }
    componentDidMount(){
        this.getGroups();
    }
    renderGroups = (groups) => {
        if (groups != []){
	    let new_groups = groups.filter(group =>
					   group.name.includes(this.state.search) || group.name.toLowerCase().includes(this.state.search) );
			return Object.values(new_groups).map((group,id) => 
        <GroupEntity key={id} name={group.name} id={group.id} 
        setGroupClick={this.props.setGroupClick} getGroupInfo={this.props.getGroupInfo}/>)
	}else{
		return null						    
	}
	
    }
    render() { 
        const items = this.renderGroups(this.state.groups);
        return (
            <div className="groups-container">
                <input type="text" id="groups-list-search" className="groups-list-search" /> 
                <GroupsModal show={this.state.show} handleClose={this.handleClose}>
                    <div className="group-form">
                        <input onChange={this.handleNameChange} id="group-name" className="group-form-field" placeholder="Название группы"/>
                        <input onChange={this.handleNamedLinkChange} id="group-named-link" className="group-form-field" placeholder="Именная ссылка"/>
                        <button onClick={this.createGroup} id="create-btn" className="create-group">Подтвердить</button>
                    </div>
                </GroupsModal>
                <button onClick={this.handleOpen} className="create-group">Создать группу</button>
             <div className="groups-list">

            <div className="groups-entities">
                {items}
                <GroupEntity setGroupClick={this.props.setGroupClick} getGroupInfo={this.props.getGroupInfo}/>
            </div>
        </div> </div>);
    }
}
 
export default GroupsList;
