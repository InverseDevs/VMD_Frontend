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
        await this.getData(`https://inversedevs.herokuapp.com/group/getGroupById/${this.props.groupId}`)
        .then(data => {
			this.setState({groupInfo: data.group}); 
        })
       
    }
    componentDidMount(){
        this.getGroup();
    }
    render() { 
	    if (this.state.groupInfo != null){
        return ( 
            <div className="groups-container">
                
                <GroupsHeader name={this.state.groupInfo.name} id={this.state.groupInfo.id} admins={this.state.groupInfo.admins} banned={this.state.groupInfo.banned_users} members={this.state.groupInfo.members}/>
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
