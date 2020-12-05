import React from 'react';
import './TabList.css';
import Tab from '../Tab/Tab';
class TabList extends React.Component {
    constructor(props){
        super(props);
    }
    renderTabs = (tabs) => {
        let found = false;
        let new_tabs = []
        new_tabs.push(tabs[0])
        for (let i = 1; i < tabs.length;++i){
            found = false
            for (let j = 0; j < new_tabs.length; ++j){
                   if (new_tabs[j].id == tabs[i].id){
                        found = true   
                   }
            }
            if (found == true){
                continue;   
            }
            else{
               new_tabs.push(tabs[i])
            }
        }
      
        console.log('new',new_tabs)
        console.log('old',tabs)
        return new_tabs[0] != undefined ? Object.values(new_tabs).map((tab,i) => <Tab key={i} getMessages={this.props.getMessages} getInfo={this.props.getInfo} chatInfo={this.props.chatInfo} closeTab={this.props.closeTab} name={tab.name} avatar={tab.avatar} id={tab.id}/>) : null
    }
    render(){
    const tabs = this.props.tabs != [] ? window.localStorage.getItem('tabs') != "" ?  this.renderTabs(JSON.parse(window.localStorage.getItem('tabs')).concat(this.props.tabs)) : null : window.localStorage.getItem('tabs') != "" ? this.renderTabs(JSON.parse(window.localStorage.getItem('tabs'))) : null;
    return (
        <div className="tab-list">
            {tabs}
        </div>
    )
} 

}

export default TabList;
