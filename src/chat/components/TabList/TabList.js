import React from 'react';
import './TabList.css';
import Tab from '../Tab/Tab';
class TabList extends React.Component {
    constructor(props){
        super(props);
    }
    renderTabs = (tabs) => {
        return Object.values(tabs).map((tab,i) => <Tab key={i} getMessages={this.props.getMessages} getInfo={this.props.getInfo} chatInfo={this.props.chatInfo} closeTab={this.props.closeTab} name={tab.name} avatar={tab.avatar} id={tab.id}/>)
    }
    render(){
  
    const tabs = this.props.tabs != [] ? this.renderTabs(this.props.tabs) :Object.assign({},JSON.parse(window.localStorage.getItem('tabs'))).map((tab,i) => <Tab key={i} getMessages={this.props.getMessages} getInfo={this.props.getInfo} chatInfo={this.props.chatInfo} closeTab={this.props.closeTab} name={tab.name} avatar={tab.avatar} id={tab.id}/>);
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;
