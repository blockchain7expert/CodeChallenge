import React from "react";
import Modal from "react-bootstrap/Modal";

const OtpModal = (props) => {
  return (
      <Modal 
      {...props}
      show={props.show} 
      onHide={props.handleClose} 
      backdrop="static" 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>OTP Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container was-validated text-center">
          <div className="row justify-content-center">
            <div className="col col-lg-5">
              <p>Please input 6583</p>
              <input 
                type="text" 
                className="form-control" 
                placeholder="OTP Authentication" 
                id="otp" 
                name="otp" 
                value={props.inputs.otp || ""} 
                onChange={props.handleChange}
                pattern="[0-9]{4}"                   
                required
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.handleClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={props.sendTokens}>
          SEND TOKENS
        </button>
      </Modal.Footer>
    </Modal>      
  );
}

export default OtpModal;