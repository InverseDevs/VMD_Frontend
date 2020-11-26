import React from 'react';
import './TabList.css';
import Tab from '../Tab/Tab';
class TabList extends React.Component {
    constructor(props){
        super(props);
        this.state={tabs : this.props.tabs}
    }
    renderTabs = (tabs) => {
        return Object.values(tabs).map((tab,i) => <Tab key={i} closeTab={this.props.closeTab} tabInfo={tab.info} />)
    }
    render(){
    const tabs = this.renderTabs(this.state.tabs);
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;