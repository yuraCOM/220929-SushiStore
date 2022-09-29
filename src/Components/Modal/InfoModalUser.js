import { observer } from "mobx-react-lite";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const InfoModalUser = observer(({ show, onHide, user }) => {

  return (
    <Modal className="modal-add-new-dish" show={show} onHide={onHide} centered>
      <Modal.Body>
        {Object.keys(user).map(key =>
          <div key={key + 'infUser'} style={{ display: "flex" }}>
            <p>{key}</p>:<p style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user[key]}</p>
          </div>)
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default InfoModalUser;
