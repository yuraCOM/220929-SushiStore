import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { addOrder } from '../../FireBase/DatabaseService'
import { MainStore } from '../../Store/MainStore'
import { str_randLen } from '../../Tools/random'
import './bascket.css'

const Basket = observer(() => {
    let userStore = MainStore.userNow
    let shopStore = MainStore.shopStore
    let linkSrc = shopStore.linkImgDB // путь к каритнкам на серваке гит
    let msgStore = MainStore.infoMsg
    let infoDish = MainStore.infoDish

    //виртуальная корзина
    let basket = JSON.parse(JSON.stringify(userStore.userBasket))

    // console.log(JSON.parse(JSON.stringify(basket)));

    //меняем кол-во единиц блюд
    function handleInputChange(e, item) {
        const target = e.target;
        const value = target.value;
        item['orderQty'] = Number(value)
        // console.log(JSON.parse(JSON.stringify(item)));
        userStore.updateUserBasket(basket)
        console.log(userStore.userBasket);
    }

    function delDevFromBasket(e, id) {
        basket = basket.filter(item => item.id !== id)
        userStore.updateUserBasket(basket)
    }

    async function sendOrder() {
        // console.log(JSON.parse(JSON.stringify(userStore.userBasket)));
        // console.log(JSON.parse(JSON.stringify(userStore.user)));

        let order = {
            "orderId": "ord" + str_randLen(6),
            "user": userStore.user,
            "dishInOrder": userStore.userBasket,
            "totalSum": userStore.countUserBasketTotalSum,
            "orderCompleted": false
        }

        // console.log(JSON.parse(JSON.stringify(order)));
        addOrder(await order)
        await userStore.updateUserBasket([])

        msgStore.setMsg(`Ваш заказ ${order.orderId} отправлен! C Вами свяжется менеджер в ближайшее время для уточнения и подтверждения деталей по заказу !!`)
        msgStore.showMsg()

        // alert(`Ваш заказ ${order.orderId} отправлен - с Вами свяжется менеджер в ближайшее время!!`)

    }

    function infoDishHandler(dish) {
        infoDish.setDish(dish)
        infoDish.setIsBasketBtn(false)
        infoDish.showMsg()
    }

    return (
        <div className='cont-mgt85 '>

            {basket.length === 0
                ?
                <h3>У вас нет товаров в корзине...</h3>
                :
                <Form
                >
                    {basket.map((dish, index) =>
                        < div key={str_randLen(7)}
                            className="flex basket"
                            style={{ width: " 100 %", marginTop: "10px" }}
                            border={"light"}>
                            <div>#:{index + 1}</div>
                            <div>Id: {dish.id}</div>
                            <div>
                                <Image
                                    onClick={() => infoDishHandler(dish)}
                                    width={15} style={{ cursor: 'pointer' }}
                                    src={linkSrc(dish.img)}
                                />
                            </div>

                            <div>{dish.name}</div>

                            <div>Price: {dish.price}</div>
                            <div>
                                <div >Qty</div>
                                <input id='input-qty-basket'
                                    min={1}
                                    defaultValue={dish.orderQty}
                                    // onChange={e => setCount(handleInputChange(e, dish))}
                                    onChange={e => handleInputChange(e, dish)}
                                    type="number"
                                // style={{ width: "60px" }}
                                />
                            </div>
                            <div>Sum: {dish.orderQty * dish.price}</div>
                            <div>
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                    onClick={(e) => delDevFromBasket(e, dish.id)}
                                >Х
                                </Button>
                            </div>
                        </div>
                    )
                    }
                    <h3>Total SUM: {userStore.countUserBasketTotalSum}</h3>
                    <Button className="mt-3"
                        variant={"outline-success"}
                        onClick={() => sendOrder()}
                    >
                        Оформить заказ
                    </Button>
                </Form >
            }
        </div>
    )
})

export default Basket


