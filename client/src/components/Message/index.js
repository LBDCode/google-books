import React, { Component, useEffect, useRef }  from "react";
import {createPortal} from "react-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton"
import API from "../../utils/API";
import "./style.css";



export const GenModal = ( props ) => {
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

    return createPortal(<aside aria-modal="true" tabIndex="-1" onClick={props.clickAway} className="custom-modal-cover"><div className="custom-modal" ref={props.modalRef} onClick={null}>{props.children}</div></aside>, elemRef.current);
};


export class MessageModal extends Component { 
    constructor(props) {
        super(props);

        this.handleSelectChange.bind(this);
          
        this.state = {
            user:  props.user, 
            share: props.share,
            // sharePhone: '',
            // shareEmail: '',
            shareInput: '',
            shareMethod: '',
            shareControl: '',
            message: ''
        };
    }    
    
    handleFormInputChange = event => {
        const{ name, value } = event.target;
        this.setState({
        [name]: value
        });
    };

    handleSelectChange = (event) => {
        const value = event.target.innerText;

        this.setState({
            shareMethod: value,
            message: ''
        });

        if(value === 'SMS') {
            this.setState({ shareControl: 'tel'});
        } else if (value === 'Email') {
            this.setState({ shareControl: 'email'})
        }
    };
 
    sendMessage = event => {
        event.preventDefault();
        if(this.state.shareMethod === 'SMS') {
            event.preventDefault();
            this.formControl();
        } else if (this.state.shareMethod === "Email") {
            event.preventDefault();
            this.formControl()
        }
    };

    formControl = () => {
        const input = this.state.shareInput;

        if(this.state.shareMethod === "SMS") {
            let phone = input.replace(/\D/g, '');
            if(phone.length === 10) {
                this.setState({ message: "Sending..."});
                this.sendText();
            } else {
                this.setState({ message: "Please use a valid 10 digit phone number."})
            }
        } else if (this.state.shareMethod === "Email") {
            let email = input.split('@');
            if (email.length !== 2 || (email[1].split('.').length !== 2)) {
                this.setState({ message: "Please use a valid email address (example@gmail.com)"})
            } else if (email[1].split('.')[0] === "" || email[1].split('.')[1] === "" ) {
                this.setState({ message: "Please use a valid email address (example@gmail.com)"})
            } else {
                this.setState({ message: "Sending..."});
                this.sendEmail();
            }
        }
    };

    formatNumber = (number) => {
        let num = number.replace(/\D/g, '');
        if(num.length === 10) {
            let formated = num.match(/^(\d{3})(\d{3})(\d{4})$/);
            return '(' + formated[1] + ') ' + formated[2] + '-' + formated[3];
        } else {
            return num;
        }
    };
    
    sendText = () => {
        API.sendText(this.state.user, this.state.shareInput, this.state.share)
        .then(res => {
            let num = this.formatNumber(res.data.number);
            this.setState({message: `Success!  Text sent to ${num}.`});
        })
        .then(this.setState({
            shareInput: '',
            shareMethod: ''
        }))
        .catch(err => console.log(err))
    };

    sendEmail = () => {
        API.sendEmail(this.state.user, this.state.shareInput, this.state.share)
        .then(res => {
            const data = JSON.parse(res.config.data);
            this.setState({message: `Success!  Email sent to ${data.email}.`});
        })
        .then(this.setState({
            shareInput: '',
            shareMethod: ''
        }))
        .catch(err => console.log(err))
    };

    render () {  

        var props = this.props; 

        return (
            <div className={"message-body"}>
                <Row>
                    <Col xs={{span: 1, offset: 11}}>
                        {props.children}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span: 12}}>
                        <h3 className="modal-title">Share a book via email or SMS</h3>
                    </Col>
                </Row>
                <Row className="message-book" >
                    <Col xs={{span: 12, order: 2}} sm={{span: 3, order: 1}}>
                        <img className="message-image" src={this.state.share.imgLink} alt="cover art"/>
                    </Col>
                    <Col xs={{span: 12, order: 1}} sm={{span: 8, order: 2}}>
                        <div >
                            <h5 className="message-title">{this.state.share.title}</h5>
                            <p>by {this.state.share.author}</p>
                        </div>
                    </Col>
                </Row>

                <Form className="message-form">
                    <div ref={node => this.node = node} className="reg-share">
                        <InputGroup className="mb-3">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-danger"
                                title={this.state.shareMethod === "" ? "Select" : this.state.shareMethod}
                                name="shareMethod"
                                id="input-group-dropdown-1"
                            >
                            <Dropdown.Item key="text" onClick={this.handleSelectChange}>SMS</Dropdown.Item>
                            <Dropdown.Item key="email" onClick={this.handleSelectChange}>Email</Dropdown.Item>
                            </DropdownButton>
                            <FormControl
                                type={this.state.shareControl} 
                                onChange={this.handleFormInputChange} 
                                name="shareInput" 
                                value={this.state.shareMethod === "SMS" ? this.formatNumber(this.state.shareInput) : this.state.shareInput}
                                placeholder={this.state.shareMethod === "" ? 
                                    "Choose SMS or email" : 
                                    this.state.shareMethod === "Email" ? 
                                    "@email" :
                                    "xxx-xxx-xxxx"
                                }                             
                            />
                            <InputGroup.Append>
                            <Button 
                                type="submit" 
                                variant="success"
                                disabled={!(this.state.shareInput) || !(this.state.shareMethod)} 
                                onClick={this.sendMessage}
                            >   
                                Send
                            </Button>
                            </InputGroup.Append>                        
                        </InputGroup>
                        <p className="send-message">{this.state.message}</p>
                    </div>
                    <div className="mobile-share">
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.shareMethod === "" ? "Select" : this.state.shareMethod}
                            name="shareMethod"
                            id="input-group-dropdown-2"
                        >
                            <Dropdown.Item key="text" onClick={this.handleSelectChange}>SMS</Dropdown.Item>
                            <Dropdown.Item key="email" onClick={this.handleSelectChange}>Email</Dropdown.Item>
                        </DropdownButton>
                        <InputGroup>
                            <FormControl
                                type={this.state.shareControl} 
                                onChange={this.handleFormInputChange} 
                                name="shareInput" 
                                value={this.state.shareMethod === "SMS" ? this.formatNumber(this.state.shareInput) : this.state.shareInput}
                                placeholder={this.state.shareMethod === "" ? 
                                "Choose SMS or email" : 
                                this.state.shareMethod === "Email" ? 
                                    "@email" :
                                    "xxx-xxx-xxxx"
                                } 
                            />
                            <InputGroup.Append>
                            <Button 
                                type="submit"
                                variant="success" 
                                disabled={!(this.state.shareInput) || !(this.state.shareMethod)} 
                                onClick={this.sendMessage}
                            >   
                                Send
                            </Button>
                            </InputGroup.Append>
                        </InputGroup>    
                        <p className="send-message">{this.state.message}</p>
                    </div>
                </Form>
            </div>
        );
    }
};



