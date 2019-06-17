import React, { Component, useEffect, useRef }  from "react";
import {createPortal} from "react-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import "./style.css";



export function GenModal ({ children }) {
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

export class MessageModal extends Component { 
    constructor(props) {
        super(props);
          
        this.state = {
          share: props.share,
          sharePhone: '',
          shareEmail: '',
        };
    }    
    
    handleFormInputChange = event => {
        const{ name, value } = event.target;
        this.setState({
        [name]: value
        });
    };

    sendText = event => {
        event.preventDefault();
        API.sendText(this.state.sharePhone, this.state.share);
        console.log("sent text");
        // .then(console.log("sent message"))
        // .catch(err => console.log(err))
    };

    render () {  

        var props = this.props; 

        return (
            <div>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                <h3>Share a book via email or SMS</h3>
                </Modal.Title>
                {props.children}
            </Modal.Header>
            <Modal.Body>
                <h5>{this.state.share.title}</h5>
                <p>by {this.state.share.author}</p>
                <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Col sm={10}>
                    <Form.Control type="email" onChange={this.handleFormInputChange} name="shareEmail" defaultValue={this.state.shareEmail} placeholder="Email" />
                    </Col>
                    <Col sm={2}>
                    <Button type="submit" disabled={!(this.state.shareEmail)}>Email</Button>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalText">
                    <Col sm={10}>
                    <Form.Control type="phone" onChange={this.handleFormInputChange} name="sharePhone" defaultValue={this.state.sharePhone} placeholder="Phone Number" />
                    </Col>
                    <Col sm={2}>
                    <Button type="submit" disabled={!(this.state.sharePhone)} onClick={this.sendText} >Text</Button>
                    </Col>
                </Form.Group>
                </Form>
            </Modal.Body>
            </div>

        );
    }
};



