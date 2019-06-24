import React from "react";


export function Modal ({ children }) {
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div> 
  );
};

export function ModalTabList ({ children }) {
  return (
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      {children}
      </ul>
  );
}