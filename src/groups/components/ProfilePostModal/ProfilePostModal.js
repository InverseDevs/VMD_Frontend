import React from 'react';
import './ProfilePostModal.css';
const ProfilePostModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
        </section>
        <button className="modal-hide" onClick={handleClose}>.</button>
      </div>
    );
  };

export default ProfilePostModal;