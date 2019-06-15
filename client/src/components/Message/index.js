import React, { Component, useEffect, useRef }  from "react";
import {createPortal} from "react-dom";
import "./style.css";



export function Modal ({ children }) {
    const elemRef = useRef(null);
    if (!elemRef.current) {
        const m = document.createElement('div');
        elemRef.current = m;
    }
    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elemRef.current);

        return () => modalRoot.removeChild(elemRef.current);
    }, []);

    return createPortal(<aside className="custom-modal-cover"><div className="custom-modal">{children}</div></aside>, elemRef.current);
};


// export default Modal;

// export class MessageModal extends Component { 
//     constructor(props) {
//         super(props);
          
//         this.state = {
//           share: props,
//         };
//       }  

//     render () {  
//         var props = this.props; 
//         return (
//             <div className="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModalTitle" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered" role="document">
//                     <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="messageModalTitle">Share {props.title} </h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         ...
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button type="button" className="btn btn-primary">Save changes</button>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };

// export function MessageButton(props)  {
//     return (
//         <i className="fas fa-share-alt"  onClick={() => props.onModalClick(props.book)}></i>
//     );
// };


