import { observer } from 'mobx-react-lite';
import React from 'react'
import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { editDishInFB } from '../../FireBase/DatabaseService';
import { MainStore } from '../../Store/MainStore';
import { addDishInUserStore, checkDishInBasket } from '../../Tools/assist';
import "./styleItem.css"

const Item = observer((props) => {

    let dish = props.data

    let userStore = MainStore.userNow
    let shopStore = MainStore.shopStore
    let msgStore = MainStore.infoMsg
    let infoDish = MainStore.infoDish

    const [inBasket, setInBasket] = useState(false)
    const [notSale, setNotSale] = useState(dish.notSale || false)

    useEffect(() => {
        checkDishInBasket(dish) && setInBasket(true)

    }, [userStore.userBasket.length, notSale])



    // linkSrc = "https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/"
    let linkSrc = shopStore.linkImgDB

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

    function infoDishHandler(dish) {
        infoDish.setIsBasketBtn(true)
        infoDish.setDish(dish)
        infoDish.showMsg()
    }

    function notSaleHandler(e, dish) {
        let check = dish.hasOwnProperty('notSale')
        if (!check) { dish.notSale = false }
        setNotSale(!notSale)
        let updDish = { ...dish }
        updDish.notSale = !notSale
        editDishInFB(dish.id, dish.store, updDish)

    }

    return (

        dish.notSale && userStore.user.userRole !== 'ADMIN' ? false :
            <div className={`order_block ${notSale && 'unavalable'}`}>
                <div className='info-dish' onClick={() => infoDishHandler(dish)}>
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
                </div>

                <div className="order_block_text">
                    <p style={{ fontWeight: "bold", marginTop: '5px' }}>Id. {dish.id}</p>
                    <p>Состав: {dish.about}.</p>
                    <div className='flex-left'>
                        <p>Вес: {dish.weight}г. {dish.type && `/ ${dish.type}`} {dish.kind && `/ ${dish.kind}`} </p>
                        {/* <p>Вид: {dish.type}</p> */}
                    </div>
                    {/* {dish.kind ? <p>*{dish.kind}</p> : false} */}
                    <p>{dish.diffInfo}</p>

                </div>
                <div className="order_block_bottom ">
                    <div className="order_block_bottom_wrapper">
                        <div className="order_block_price">{dish.price} грн</div>
                        <div className="order_block_button">
                            {notSale && <p>НЕ ДОСТУПНО</p>}
                            {!notSale && <div className={inBasket ? "button trigger-click ordered" : "button trigger-click"}
                                // data-link="/add-cart?id=113"
                                onClick={(e) => bucketHandler(e, dish)}>
                                {!inBasket ? "Заказать" : "В корзине"}
                            </div>}
                        </div>
                        {userStore.user.userRole === 'ADMIN' &&
                            <div className='avalable'>
                                <label htmlFor="#box4">unAvailable:</label>
                                <input id="box4"
                                    onChange={(e) => notSaleHandler(e, dish)}
                                    type="checkbox"
                                    checked={notSale}
                                />
                            </div>}
                    </div>
                </div>

            </div >

    )
})

export default Item


