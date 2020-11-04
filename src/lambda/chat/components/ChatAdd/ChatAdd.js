import React from 'react';
import './ChatAdd.css';
import addBtn from '../../../../images/add_chat.png';
const ChatAdd = ({addGroup}) => {
    return (
        <button onClick={addGroup} id="add-btn"><img src={require('../../../../images/add_chat.png')}  id="add-btn-img"></img></button>
    );
}

export default ChatAdd;
