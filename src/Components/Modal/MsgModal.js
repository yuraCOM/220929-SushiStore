import { observer } from "mobx-react-lite";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

// @ts-ignore
const MsgModal = observer(({ show, onHide, msg }) => {

  return (
    <Modal className="modal-add-new-dish" show={show} onHide={onHide} centered>
      <Modal.Body>
        {msg}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default MsgModal;
