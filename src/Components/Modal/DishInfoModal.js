import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { MainStore } from "../../Store/MainStore";
import { addDishInUserStore, checkDishInBasket } from "../../Tools/assist";


// @ts-ignore
const DishInfoModal = observer(({ show, onHide }) => {

  let userStore = MainStore.userNow
  let msgStore = MainStore.infoMsg

  let shopStore = MainStore.shopStore
  let linkSrc = shopStore.linkImgDB
  let infoDish = MainStore.infoDish

  // eslint-disable-next-line no-unused-vars
  const [dish, setDish] = useState(infoDish.infoDish)
  const [inBasket, setInBasket] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [fullscreen, setFullscreen] = useState(true);

  useEffect(() => {
    checkDishInBasket(dish) && setInBasket(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userBasket.length])

  function bucketHandler(e, dish) {
    if (userStore.isAuth) {
      if (checkDishInBasket(dish)) {
        alert('Dish just in basket')
      } else {
        setInBasket(true)
        addDishInUserStore(dish)
      }
    } else {
      msgStore.setMsg(msgStore.infoMsgBD.singIn)
      msgStore.showMsg()
    }
  }


  return (
    <Modal fullscreen={fullscreen}
      size="xl"
      className="modal-add-new-dish"
      show={show}
      onHide={onHide}
      centered>
      <Modal.Header closeButton >
        <Modal.Title>{dish.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="o">
          <div className="order_block_top">
            <div className="order_block_weight">{dish.weight}г</div>
          </div>
          <div className="order_block_img">
            <img className="trigger-click" loading="lazy"
              src={linkSrc(dish.img)} alt={dish.name}></img>
          </div>
          <div style={{ cursor: "pointer" }} className="order_block_title trigger-click">
            <h4>{dish.name}</h4>

          </div>

          <div className="order_block_text">
            <p style={{ fontWeight: "bold", marginTop: '5px' }}>Id. {dish.id}</p>
            <p>Состав: {dish.about}.</p>
            <div className='flex-left'>
              <p>Вес: {dish.weight}г. {dish.type && `/ ${dish.type}`} {dish.kind && `/ ${dish.kind}`} </p>
            </div>
            <p>{dish.diffInfo}</p>

          </div>
          <div className="order_block_bottom">
            <div className="order_block_bottom_wrapper">
              <div className="order_block_price">{dish.price} грн</div>
              {infoDish.isBasketBtn &&
                <div className="order_block_button">
                  <div className={inBasket ? "button trigger-click ordered" : "button trigger-click"}
                    onClick={(e) => bucketHandler(e, dish)}
                  >
                    {!inBasket ? "Заказать" : "В корзине"}
                  </div>
                </div>}

            </div>
          </div>

        </div >
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DishInfoModal;
