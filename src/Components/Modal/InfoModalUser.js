import { observer } from "mobx-react-lite";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { randomN } from "../../Tools/random";
import { useState } from "react";
import { updateUserInFireBase } from "../../FireBase/DatabaseService";

const InfoModalUser = observer(({ show, onHide, user, setAllUsers, updUser, setFindFlag }) => {

  const [updUserNow, setUpdUserNow] = useState(user)
  let update = { ...updUserNow }

  function liveUpd(e, key) {
    e.preventDefault()
    let txt = e.target.value
    update[key] = txt
  }

  function saveUserInfo() {
    // console.log(update);
    updateUserInFireBase(update)
    setFindFlag(false)
    setAllUsers([])
    onHide()
  }

  return (
    <Modal className="modal-add-new-dish" show={show} onHide={onHide} centered>
      <Modal.Body>
        {updUser === undefined && Object.keys(user).map(key =>
          <div key={key + 'infUser'} style={{ display: "flex" }}>
            <p>{key}</p>:<p style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user[key]}</p>
          </div>)
        }
        {updUser && <div>
          {Object.keys(user).map(key =>
            <div key={randomN()} className='flex-left infuser'>
              <label>
                {key}
                <textarea defaultValue={update[key]} readOnly={key === "regTime" ? true : false}
                  onChange={(e) => liveUpd(e, key)}
                ></textarea>
              </label>
            </div >
          )}
          <button onClick={() => saveUserInfo()}>Сохранить</button>
        </div>
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal >
  );
});

export default InfoModalUser;


