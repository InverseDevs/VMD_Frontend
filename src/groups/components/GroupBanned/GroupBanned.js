import React, { Component } from 'react'
import './GroupBanned.css';

class GroupBanned extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        //const status = this.props.online === false || this.props.online === "false" ? <div className="friend-offline"></div> : <div className="friend-online"></div>
        return (
            
				<div className="friend">
                    <div className="friend-info">
                        <div className="ava"></div>
                        <div className="ava-devisor">
                        <div className="friend-name">
                            Name
                            {/* {status} */}
                        </div>
                    </div>
                    <button  type="button" className="delete-friend">Разбанить</button>
                    </div>
                    
				</div>
        )
    }
}
 
export default GroupBanned;