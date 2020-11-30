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
    console.log('came',this.props.tabs)
    console.log('old',JSON.parse(window.localStorage.getItem('tabs')))
    const tabs = this.props.tabs != [] ? this.renderTabs(this.props.tabs) :this.renderTabs(Object.assign({},JSON.parse(window.localStorage.getItem('tabs'))));
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;
