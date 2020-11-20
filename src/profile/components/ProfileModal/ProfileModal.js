import React from 'react';
import './ProfileModal.css';
const ProfileModal = ({ handleClose, show, children }) => {
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

export default ProfileModal;
