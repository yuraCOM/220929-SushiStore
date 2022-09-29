import { observer } from "mobx-react-lite";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { str_randLen } from "../../Tools/random";
import { MainStore } from "../../Store/MainStore";
import { Image } from 'react-bootstrap'


const InfoModalOrders = observer(({ show, onHide, orders, place = '' }) => {

  let shopStore = MainStore.shopStore
  let infoDish = MainStore.infoDish
  let linkSrc = shopStore.linkImgDB // путь к каритнкам на серваке гит

  // let userInfo = Object.keys(user)
  let ordersArr = orders.dishInOrder.map((dish, index) =>
    < div key={str_randLen(7)}
      className="flex basket"
      style={{ width: " 100 %", marginTop: "10px" }}
      border={"light"}>
      <div>#:{index + 1}</div>
      <div>Id: {dish.id}</div>
      <div>
        <Image onClick={() => infoDishHandler(dish)}
          width={15} style={{ cursor: 'pointer' }}
          src={linkSrc(dish.img)}
        />
      </div>
      <div>{dish.name}</div>
      <div>Price: {dish.price}</div>
      <div>
        <div >Qty</div>
        <p>{dish.orderQty}</p>
      </div>
      <div>Sum: {dish.orderQty * dish.price}</div>
      {place === 'admin' &&
        <Button
          size="sm"
          variant="outline-danger"
          onClick={(e) => delDishFromOrder(orders, dish.id)}
        >Х
        </Button>
      }
    </div>
  )

  function infoDishHandler(dish) {
    infoDish.setDish(dish)
    infoDish.setIsBasketBtn(false)
    infoDish.showMsg()
  }

  function delDishFromOrder(orders, dishID) {
    orders.orderCompleted ? alert("Удалить нельзя!!Заказ уже выполнен!") : console.log(orders.orderCompleted);
    // updateOrderInFireBaeByID(orders.orderId, dishID)
  }

  return (
    <Modal size="lg" className="modal-add-new-dish" show={show} onHide={onHide} centered>
      <Modal.Body >
        <h5>Basket ID: {orders.orderId}</h5>
        {ordersArr}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default InfoModalOrders;



