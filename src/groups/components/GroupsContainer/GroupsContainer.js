import React from 'react'
import './GroupsContainer.css';
import GroupsHeader from '../GroupsHeader/GroupsHeader';
import GroupsFooter from '../GroupsFooter/GroupsFooter';
class GroupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            groupInfo: null,
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
    getGroup = async () => {
	let numbers = /^[0-9]+$/;
        await this.getData(`https://inversedevs.herokuapp.com/group/${this.props.groupId.match(numbers) ? 'getGroupById' : 'getGroupByNamedLink'}/${this.props.groupId}`)
        .then(data => {
			this.setState({groupInfo: data}); 
        })
       
    }
    componentDidMount(){
        this.getGroup();
    }
    render() { 
	    
	    if (this.state.groupInfo != null){
		    console.log('admins from container', this.state.groupInfo)
        return ( 
		
            <div className="groups-container">
                
                <GroupsHeader name={this.state.groupInfo.name} owner={this.state.groupInfo.owner_id} id={this.state.groupInfo.id} avatar={this.state.groupInfo.picture} admins={this.state.groupInfo.admins} banned={this.state.groupInfo.banned_users} members={this.state.groupInfo.members}/>
                <hr className="groups-break-line" />
                <GroupsFooter posts={this.state.groupInfo.posts}/>
            </div>
         );
	    }
	    else{
		return (<div className="groups-container">
			</div>)
	    }
    }
}
 
export default GroupsContainer;
