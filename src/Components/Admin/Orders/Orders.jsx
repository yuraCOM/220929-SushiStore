import { observer } from 'mobx-react-lite';
import React from 'react'
import './order.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { delOrderFromFireBase, liveNewOrders, updateOrderInFireBase } from '../../../FireBase/DatabaseService';
import { getOrders } from '../../../Tools/assist';
import { str_randLen } from '../../../Tools/random';
import moment from 'moment';
import InfoModalUser from '../../Modal/InfoModalUser';
import InfoModalOrders from '../../Modal/InfoModalOrders';
import { MainStore } from '../../../Store/MainStore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Orders = observer(() => {
    const adminStore = MainStore.adminStore

    const [showuserInfo, hideShowUserInfo] = useState(false)
    const [showOrdersInfo, hideShowOrdersInfo] = useState(false)
    const [chooiseUser, setChooiseUser] = useState([])
    const [chooiseOrders, setChooiseOrders] = useState({})

    const [orders, setOrders] = useState([])
    // console.log(JSON.parse(JSON.stringify(x)));

    useEffect(() => {

        async function fetchData() {
            setOrders(await getOrders())
        }
        fetchData()
    }, [adminStore.qtyNewOrders])


    function chekHandler(e, item) {
        async function fetchData() {
            if (item.orderCompleted) {
                item["orderCompleted"] = false
            }
            else {
                item["orderCompleted"] = true
            }
            await updateOrderInFireBase(item)
            let data = await getOrders()
            setOrders(await data)
            await liveNewOrders()
        }
        fetchData()
    }

    function delFromOrders(e, item) {
        if (item.orderCompleted) {
            alert("Удалить нельзя! Заказ Выполнен!")
        } else {
            let delOrder = window.confirm(`Удалить заказ ${item.orderId}`);
            delOrder && fetchData()
        }
        async function fetchData() {
            await delOrderFromFireBase(item.orderId, "Orders")
            let data = await getOrders()
            setOrders(data)
        }
    }

    function userInfo(user) {
        setChooiseUser(user)
        hideShowUserInfo(true)
    }

    function orderInfo(dishInOrder, orderId, orderCompleted) {
        hideShowOrdersInfo(true)
        setChooiseOrders({ dishInOrder, orderId, orderCompleted })
    }

    return (
        <div className='cont-mgt85'>
            {orders.length === 0 ? <Loader /> :
                orders.map(item =>
                    <div key={str_randLen(7)} className={item.orderCompleted ? "flex order-admin complited" : "flex order-admin"}>
                        <p>{moment(item.time).format('MMM Do YY, h:mm: a')}</p>
                        <p>№ <b>{item.orderId}</b></p>
                        <p>TotalSum: <b>{item.totalSum}грн</b></p>
                        <p>UserId: <b>{item.user.id}</b></p>
                        <button className='btn-orders' onClick={() => userInfo(item.user)}>Name: <b>{item.user.userName}</b></button>
                        <button className='btn-orders' onClick={() => orderInfo(item.dishInOrder, item.orderId, item.orderCompleted)}>OrderInfo</button>
                        <div className='div-completed'>
                            <label htmlFor="#box4">Completed:</label>
                            <input id="box4" onChange={(e) => chekHandler(e, item)} type="checkbox" checked={item.orderCompleted} />
                        </div>
                        <Button className='btn-del-order'
                            size="sm"
                            variant="outline-danger"
                            onClick={(e) => delFromOrders(e, item)}
                        >Х
                        </Button>
                    </div>
                )
            }
            {showOrdersInfo && <InfoModalOrders
                show={showOrdersInfo}
                onHide={() => hideShowOrdersInfo(false)}
                orders={chooiseOrders}
                place={'admin'}
            />}

            {showuserInfo && <InfoModalUser show={showuserInfo} onHide={() => hideShowUserInfo(false)}
                user={chooiseUser} />}
        </div >
    )
})

export default Orders
