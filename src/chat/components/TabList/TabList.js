import React from 'react';
import './TabList.css';
import Tab from '../Tab/Tab';
class TabList extends React.Component {
    constructor(props){
        super(props);
    }
    renderTabs = (tabs) => {
        return Object.values(tabs).map((tab,i) => <Tab key={i} getInfo={this.props.getInfo} chatInfo={this.props.chatInfo} closeTab={this.props.closeTab} name={tab.name} />)
    }
    render(){
    const tabs = this.renderTabs(this.props.tabs);
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;
