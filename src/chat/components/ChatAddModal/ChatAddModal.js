import React from 'react';
import './ChatAddModal.css';
class ChatAddModal extends React.Component {
 
    constructor(props) {
        super(props);
    }
    onHide = ()=>{
        this.props.getShow(false);    
    }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
        </section>
        <button className="modal-hide" onClick={this.onHide}>.</button>
      </div>
    );
  };
}
export default ChatAddModal;