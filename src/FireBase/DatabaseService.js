import React from 'react'
import { getDatabase, ref, onValue, set, push, remove, get, update, query, orderByChild, equalTo, onChildChanged } from "firebase/database";
// eslint-disable-next-line no-unused-vars
import { storage } from './firebase' // надо обязательно
import { str_randLen } from '../Tools/random';
import { MainStore } from '../Store/MainStore';
import { callMenuTypeFood, getUserOrders, notifSet } from '../Tools/assist';

const shopStore = MainStore.shopStore
const adminStore = MainStore.adminStore
let userStore = MainStore.userNow

const db = getDatabase();

// +++++ firebase - read all data вся база
export async function readAllFireStoreDB() {
    const all = ref(db, '/');
    let snapshot = await get(all)
    let data = await snapshot.val();
    console.log(data);
    alert('в консоле')
}


let menuArr = shopStore.menuStart.map(i => String(Object.keys(i)))
menuArr.forEach(item => {
    let puthRef = ref(db, item)
    onValue(puthRef, (snapshot) => {
        menuBtnHundler(shopStore.currentType)
    })
})


function menuBtnHundler(key) {
    shopStore.setCurrentSecondType('')
    shopStore.setCureentKind('')
    shopStore.setCureentKindMenu([])
    callMenuTypeFood(key)
    shopStore.setCurrentTypeMenu(key)
}

export async function liveOnOrder() {
    userStore.userOrders.forEach(item => {
        const order = query(ref(db, "Orders"), orderByChild('orderId'), equalTo(item.orderId))
        onValue(order, (snapshot) => {
            async function fetchOrdersUserData() {
                let data = await getUserOrders(userStore.user.id)
                userStore.setUserOrders(data)
            }
            fetchOrdersUserData()
        })
    })
}

// наблюдение за заказами
// const orders = query(ref(db, "Orders"))
export async function liveNewOrders() {
    const orders = query(ref(db, "Orders"), orderByChild('orderCompleted'), equalTo(false))
    let snapshot = await get(orders)
    let data = await snapshot.val();
    let qtyNotComplited = data === null ? [] : await Object.values(data);
    adminStore.setNewOrders(await qtyNotComplited.length)
    // console.log("func liveNewOrders", await qtyNotComplited);
}

// отслеживание изменений в заказах всех
const ordersCompleted = query(ref(db, "Orders"))
onValue(ordersCompleted, async (snapshot) => {
    // await liveNewOrders()
    let data = await snapshot.val();
    let orders = data === null ? [] : Object.values(data);
    let qtyNotComplited = orders.filter(order => order.orderCompleted === false).length
    adminStore.setNewOrders(await qtyNotComplited)
    // console.log("onValue orders change", adminStore.qtyNewOrders);
})




// --------------- user
// +++++ firebase чтение юзеров всех
export async function readAllUsersFireStore() {
    const currentDB = await ref(db, 'Users');
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    let items
    data ? items = Object.values(data) : items = []
    return items;
}

// чтение одного юзера
export async function readONEUsersFireStore(login, password) {

    const findID = query(ref(db, "Users"), orderByChild('userName'), equalTo(login))
    let snapshot = await get(findID)
    let user = await snapshot.val();

    if (typeof (user) === "object") {
        if (user === null) {
            user = null;
        } else {
            let userUpd = Object.values(user);
            user = userUpd
        }

    }

    let dataUser = {}

    if (user === null) {
        dataUser = { ...dataUser, auth: false, messg: 'Нет такого пользователя' }
    }
    if (user && user[0].userPassword !== password) {
        dataUser = { ...dataUser, auth: false, messg: 'Не верные данные' }
    }
    if (user && user[0].userPassword === password) {
        dataUser = { ...user[0], auth: true }
    }

    return dataUser
}

// +++++ firebase add one new user
export async function addOneUserInFireBase(user) {
    const db = getDatabase();
    const usersList = ref(db, 'Users');
    const newUser = push(usersList);
    set(newUser, user);
}

// +++++ firebase update user
export async function updateUserInFireBase(user) {
    const db = getDatabase();
    const currentDB = await ref(db, 'Users');
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    for (const key in data) {
        if (data[key].id === user.id) {
            // console.log("key", key, '------- id =', user.id);
            update(ref(db, `Users/${key}`), user)
        }
    }
}

// delete user from db
export async function delUserInFireBase(user) {
    const db = getDatabase();
    const currentDB = await ref(db, 'Users');
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    for (const key in data) {
        if (data[key].id === user.id) {
            remove(ref(db, `Users/${key}`))
        }
    }
}


// get all USERS
export let getAllUsers = async () => {
    let dataAllUsers = await readCurrentMenu("Users")
    // dataOrders.sort((a, b) => a.time < b.time ? 1 : -1);
    return await dataAllUsers
}

// +++++ firebase чтение конкретного меню через get !!! так же получаю все заказы 
export async function readCurrentMenu(name) {
    const currentDB = await ref(db, name);
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    let items
    data ? items = Object.values(data) : items = []
    return items;
}


// --------------------- работа с блюдами
// del блюдо по айди=Юпервичный ключ - но сначало находим его первичный ключ в базе по айди.
//и удаляеи по первичному ключу +++++
export async function delDishFromFireBase(id, typeFood) {
    const dishStore = ref(db, typeFood);
    let snapshot = await get(dishStore)
    let data = await snapshot.val();
    for (const key in data) {
        if (data[key].id === id) {
            // console.log("key", key, '------- id =', id);
            remove(ref(db, `${typeFood}/${key}`))
        }
    }
}

// +++++ добавить блюдо в файер стор
export function addOneDishInFireBase(dish) {
    const store = ref(db, dish.store);
    const add = push(store);
    set(add, dish);
}

//edit dish - typeFood = store
export async function editDishInFB(id, typeFood, dish) {
    const dishStore = ref(db, typeFood);
    let snapshot = await get(dishStore)
    let data = await snapshot.val();
    for (const key in data) {
        if ((data[key].id).toString() === id.toString()) {
            update(ref(db, `${typeFood}/${key}`), dish)
        }
    }
}


//ищу блюдо через эту функц
export async function fetchDishInFB(id, typeFood) {
    const dishStore = ref(db, typeFood);
    let snapshot = await get(dishStore)
    let data = await snapshot.val();
    for (const key in data) {
        if ((data[key].id).toString() === id.toString()) {
            return await data[key]
        }
    }
}


// ******************  Orders
// +++++ firebase add новый раздел - add Orders - убрать потом
export async function addChapterInFireBase() {
    const db = getDatabase();
    const DB = await ref(db, '/'); //вся база
    const newOrder = push(DB);
    set(newOrder, { "Orders": {} });
}

// +++++ добавить Заказ в раздел-базе заказов
export async function addOrder(order) {
    const db = getDatabase();
    const Orders = await ref(db, 'Orders');
    // let snapshot = await get(Orders)
    // let data = await snapshot.val();
    order['time'] = Date.now()
    const addOrder = push(Orders);
    set(addOrder, order);
}

// обновление заказа - выполнен/ не выполнен
export async function updateOrderInFireBase(order) {
    const db = getDatabase();
    const currentDB = await ref(db, 'Orders');
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    for (const key in data) {
        if (data[key].orderId === order.orderId) {
            // console.log("key", key, '------- id =', order.orderId);
            // set(ref(db, `Orders/${key}`), order)
            update(ref(db, `Orders/${key}`), order)
        }
    }
}

// ищем order по айди заказа
export async function findOrderInFireBaseByID(id) {
    const findID = query(ref(db, "Orders"), orderByChild('orderId'), equalTo(id))
    let snapshot = await get(findID)
    let data = await snapshot.val();
    return data
}

// удаление-обновление заказа (удаление блюда из заказв)
export async function updateOrderInFireBaeByID(orderId, dishId) {
    let order = await findOrderInFireBaseByID(orderId)
    for (const key in order) {
        if (order[key].orderId === orderId) {
            // console.log("key", key, '------- id =', order.orderId);
            let dishes = order[key].dishInOrder
            dishes = dishes.filter(item => item.id !== dishId)
            let updOrder = { ...order[key], dishInOrder: dishes }
            update(ref(db, `Orders/${key}`), updOrder)
        }
    }
}


// del заказа по айди=первичный ключ - но сначало находим его первичный ключ в базе по айди.
//и удаляеи по первичному ключу +++++
export async function delOrderFromFireBase(id, link) {
    const orderStore = ref(db, link);
    let snapshot = await get(orderStore)
    let data = await snapshot.val();
    for (const key in data) {
        // remove(ref(db, `/${link}/${key}`)) // remove all
        if (data[key].orderId === id) {
            // console.log("key", key, '------- id =', id);
            remove(ref(db, `/${link}/${key}`))
        }
    }
}

//поиск заказаов по айди юзера
export async function findOrdersByIdUser(id) {
    // const findID = query(ref(db, "/Orders"), orderByChild('id'), equalTo(id))
    const findID = query(ref(db, "Orders"), orderByChild('user/id'), equalTo(id))
    let snapshot = await get(findID)
    let data = await snapshot.val();
    let items
    data ? items = Object.values(data) : items = []
    items.sort((a, b) => a.time < b.time ? 1 : -1);
    return items;
}

//Отслеиваем заказ, который заказали
export function followOrder(order) {
    const refOrder = query(ref(db, "Orders"), orderByChild('orderId'), equalTo(order.orderId))
    onValue(refOrder, (snapshot) => {
        let data = snapshot.val();
        let order
        data ? order = Object.values(data)[0] : order = []
        if (order.orderCompleted) {
            console.log('followOrder', data);
            // notifSet()
        }
    })
}

// поиск заказов юезра и отслеживанеи изм в его заказах - реалтайм отслеживание
export async function follow(user) {
    const userOrders = await query(ref(db, "Orders"), orderByChild('user/id'), equalTo(user.id))
    onChildChanged(userOrders, (data) => {
        if (data.val().orderCompleted) {
            notifSet(data.val())
        }
    });
}


// load img
// export async function loadImg(file) {
//     // const storage = getStorage();
//     // console.log(storage);
//     // const file = e.target[0].files[0];
//     if (!file) return

//     const storageRef = ref(storage, `images/${file.name}`)

//     uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
// }

const DatabaseService = () => {
    return (
        <div></div>
    )
}

export default DatabaseService