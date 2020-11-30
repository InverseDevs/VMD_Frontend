import React from 'react';
import './TabList.css';
import Tab from '../Tab/Tab';
class TabList extends React.Component {
    constructor(props){
        super(props);
    }
    renderTabs = (tabs) => {
        let new_tabs = []
        new_tabs.push(tabs[0])
        for (let i = 1; i < tabs.length;++i){
            if (!new_tabs.includes(tabs[i])){
                    new_tabs.push(tabs[i])
                }
        }
        console.log('new',new_tabs)
        console.log('old',tabs)
        return Object.values(tabs).map((tab,i) => <Tab key={i} getMessages={this.props.getMessages} getInfo={this.props.getInfo} chatInfo={this.props.chatInfo} closeTab={this.props.closeTab} name={tab.name} avatar={tab.avatar} id={tab.id}/>)
    }
    render(){
    const tabs = this.props.tabs != [] ? this.renderTabs(JSON.parse(window.localStorage.getItem('tabs')).concat(this.props.tabs)) :this.renderTabs(JSON.parse(window.localStorage.getItem('tabs')));
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;
