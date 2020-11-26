import React from 'react';
import './ChatAdd.css';
import addBtn from './add_chat.png'
class ChatAdd extends React.Component 
{ 
    constructor(props) {
        super(props);
    }
    onAdd = () => {
        this.props.getShow(true);
    }
    render(){
    return (
        <button  onClick={this.onAdd} id="add-btn"><img src={addBtn}  id="add-btn-img" alt="add-btn-img"></img></button>
    );}
}

export default ChatAdd;