import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { liveOnOrder, updateUserInFireBase } from '../../FireBase/DatabaseService';
import { MainStore } from '../../Store/MainStore';
import { getUserOrders } from '../../Tools/assist';
import { randomN, str_randLen } from '../../Tools/random';
import InfoModalOrders from '../Modal/InfoModalOrders';
import './cabinet.css'


const Cabinet = observer(() => {

    const [showOrdersInfo, hideShowOrdersInfo] = useState(false)
    const [chooiseOrders, setChooiseOrders] = useState({})

    const [virtUserTWO, setVirtUserTWO] = useState(JSON.parse(JSON.stringify(MainStore.userNow.user)))

    let updUser = { ...virtUserTWO } //виртуальна копия юзера, чтоб потом после измен сохранить в базу

    let userStore = MainStore.userNow
    let currentUser = JSON.parse(JSON.stringify(userStore.user))
    let sampleUser = MainStore.userNow.sampleUser // шаблон юзера

    let sampleUserAdmin // шаблон для отображения в зависимости от роли

    if (currentUser.userRole === "ADMIN") {
        sampleUserAdmin = Object.keys(sampleUser)
    }
    else {
        sampleUserAdmin = Object.keys(sampleUser).filter(item => {
            if (item === "userRole") {
                return false
            }
            else if (item === "id") {
                return false
            }
            return item
        })
    }

    useEffect(() => {
        async function fetchOrdersUserData() {
            let data = await getUserOrders(userStore.user.id)
            userStore.setUserOrders(await data)
            await liveOnOrder()
        }
        fetchOrdersUserData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    function editUserInfoTWO(e, key) {
        e.preventDefault()
        let txt = e.target.value
        updUser[key] = txt
    }

    function saveUserInfo() {
        MainStore.userNow.setUser(updUser)
        updateUserInFireBase(updUser)
        setVirtUserTWO(JSON.parse(JSON.stringify(MainStore.userNow.user)))
        localStorage.setItem('userSushi', JSON.stringify(updUser));
    }

    function orderInfo(order) {
        hideShowOrdersInfo(true)
        setChooiseOrders(order)
    }

    function checkData(key, user) {
        let msg
        if (key === "userEmail") {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!reg.test(user["userEmail"])) {
                msg = <p className='warning'>Incorrect e-mail</p>
            }
        }
        if (key === "userPhone") {
            let reg = /(^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2})$/;
            if (!reg.test(user["userPhone"])) {
                msg = <p className='warning'>Phone must be in the format 123-456-78-90</p>
            }
        }
        if (key === "userDeliveryPlace") {
            if (!user["userDeliveryPlace"]) {
                msg = <p className='warning'>Уточните адрес!!!</p>
            }
        }
        return msg
    }

    return (
        <div className='flex cont-mgt85 cabinet'>
            <div className='cab-user-inf'>
                <h4>User Info</h4>
                {sampleUserAdmin.map(key =>
                    <div key={randomN()}>
                        <div className='flex-left infuser'>
                            <label>
                                {key}
                                <textarea defaultValue={virtUserTWO[key]} readOnly={key === "regTime" ? true : false}
                                    onChange={(e) => editUserInfoTWO(e, key)}></textarea>
                            </label>
                        </div >
                        {checkData(key, virtUserTWO)}
                    </div>
                )}
                <button onClick={() => saveUserInfo()}>Сохранить</button>
            </div>

            <div className='cab-orders'>
                <h4>Your orders:</h4>
                {userStore.userOrders.length === 0 ? <h6>No orders.....</h6> :
                    userStore.userOrders.map(item =>
                        <div key={str_randLen(7)}
                            onClick={() => orderInfo(item)}
                            className={item.orderCompleted ? "flex order-admin complited" : "flex order-admin"}>
                            <p className='time'>{moment(item.time).format('MMM Do YYYY, h:mm:ss a')}</p>
                            <p>№ {item.orderId}</p>
                            <p>TotalSum: {item.totalSum}грн</p>
                            <p>{item.orderCompleted ? "completed" : "in work"}</p>
                        </div>
                    )
                }
            </div>
            {
                showOrdersInfo && <InfoModalOrders
                    show={showOrdersInfo}
                    onHide={() => hideShowOrdersInfo(false)}
                    orders={chooiseOrders}
                />
            }
        </div >
    )
})

export default Cabinet


