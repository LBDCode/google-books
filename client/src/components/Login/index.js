import React from "react";


export function Modal({ children }) {
  return (
    <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div> 
  );
}