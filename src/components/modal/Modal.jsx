import React, { useContext } from 'react';

import AppContext from '../../context/app-context';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Modal.css';

export default function AppModal() {
  const { showModal, setShowModal, message } = useContext(AppContext);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Vitl</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="error"><b>{message}</b></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
