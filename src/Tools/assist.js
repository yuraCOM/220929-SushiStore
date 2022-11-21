import { useEffect, useRef } from "react"
import { addOneDishInFireBase, findOrdersByIdUser, readCurrentMenu } from "../FireBase/DatabaseService"
import { MainStore } from "../Store/MainStore"
import { str_randLen } from "./random"

let shopStore = MainStore.shopStore
let userStore = MainStore.userNow


// вызываем меню для отображения
async function callMenuTypeFood(name) {

    shopStore.setCurrentTypeMenu(name)
    shopStore.setCureentKind('')

    let CurrenSectionMenu = await readCurrentMenu(name)

    shopStore.setCurrentMenu(await CurrenSectionMenu)

    shopStore.setCurrentSecondTypeMenu(CurrenSectionMenu)

    shopStore.setVirtualMenu(CurrenSectionMenu)
}

// функция добавить блюдо в базу данных
function addToBase(e, data) {
    data.id = str_randLen(6)
    console.log(data);
    addOneDishInFireBase(data)
}

//получаем ВСЕ заказы из базы
let getOrders = async () => {
    let dataOrders = await readCurrentMenu("Orders")
    dataOrders.sort((a, b) => a.time < b.time ? 1 : -1);
    return await dataOrders
}

//ищем заказы юзера который залогинился
let getUserOrders = async (id) => {
    let dataOrders = await findOrdersByIdUser(id)
    return await dataOrders
}

// проверка блюда в корзине
function checkDishInBasket(dish) {
    let basket = JSON.parse(JSON.stringify(userStore.userBasket))
    let searchDish = dish.id;
    let findDish = basket.find(dish => dish.id === searchDish)
    return findDish // true/false
}

// +блюдо в корзину - + в стор юзера
function addDishInUserStore(dish) {
    let virtDish = { ...dish, "orderQty": 1 }
    userStore.setUserBasket(virtDish)
}


export async function fetchOrdersUserData(userId, setOrders) {
    let data = await getUserOrders(userId)
    setOrders(await data)
}


//----------- Notification 
function notifyMe(orderId) {
    let notification = new Notification(`Заказ готов!`, {
        // tag: "ache-mail",
        body: `Ваш Заказ № ${orderId} готов, с Вами свяжется курьер`,
        icon: "https://raw.githubusercontent.com/yuraCOM/DataBase/main/logo2.png"
    });

}

function notifyMobile(orderId) {

    // if ("serviceWorker" in navigator) {
    //     window.addEventListener("load", () => {
    //         navigator.serviceWorker.register("%PUBLIC_URL%/sw.js")
    //             .then((reg) => {
    //                 console.log("Success serviceWorker.register ", reg.scope)
    //             }).catch((err) => {
    //                 console.log("Error", err)
    //             })
    //     })
    // }

    if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            console.log(navigator.serviceWorker.getRegistrations())
            // registrations[0].showNotification(`SushiStore заказ готов!`)
            registrations[0].showNotification(`SushiStore заказ готов!`, {
                // tag: "ache-mail",
                body: `Ваш Заказ № ${orderId}готов, с Вами свяжется курьер`,
                icon: "https://raw.githubusercontent.com/yuraCOM/DataBase/main/logo.png"
            });
        });

    }
}

export async function notifSet(order) {

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("%PUBLIC_URL%/sw.js")
                .then((reg) => {
                    console.log("Success serviceWorker.register ", reg.scope)
                }).catch((err) => {
                    console.log("Error", err)
                })
        })
    }

    if (!("Notification" in window))
        alert("Ваш браузер не поддерживает уведомления.");
    else if (Notification.permission === "granted") {
        setTimeout(() => notifyMe(order.orderId), 1000);
        setTimeout(() => notifyMobile(order.orderId), 1000);
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
            if (permission === "granted") {
                setTimeout(() => notifyMobile(order.orderId), 1000);
                setTimeout(() => notifyMe(order.orderId), 1000);
            }
        });
    }
}


//--------------

// Trace why a React component is re-rendering
function useTraceUpdate(props) {
    console.log('useTraceUpdate', props);
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }
        prev.current = props;
    });
}






export { callMenuTypeFood, addToBase, getOrders, getUserOrders, checkDishInBasket, addDishInUserStore, useTraceUpdate }