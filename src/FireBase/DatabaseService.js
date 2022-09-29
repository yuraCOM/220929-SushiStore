import React from 'react'
import { getDatabase, ref, onValue, set, push, remove, get, update, query, orderByChild, equalTo } from "firebase/database";
// eslint-disable-next-line no-unused-vars
import { storage } from './firebase' // надо обязательно
import { str_randLen } from '../Tools/random';
import { MainStore } from '../Store/MainStore';
import { callMenuTypeFood, getUserOrders } from '../Tools/assist';

const shopStore = MainStore.shopStore
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

    // console.log(typeof (user));

    if (typeof (user) === "object") {
        let userUpd = Object.values(user);
        user = userUpd
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

    // onValue - это лив наблюдение за базой
    // onValue(currentDB, async (snapshot) => {
    //     const data = snapshot.val();
    // });

}
//--------------------------------------

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
    // console.log(id, typeFood, dish);
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
            console.log(data[key]);
            return await data[key]
        }
    }
}


// ******************  Orders
// +++++ firebase add новый раздел - add Orders - убрать потом
export async function addChapterInFireBase() {
    const db = getDatabase();
    const DB = await ref(db, '/'); //вся база
    // let snapshot = await get(DB)
    // let data = await snapshot.val();
    const newOrder = push(DB);
    set(newOrder, { "Orders": {} });
}

// +++++ добавить Заказ в раздел-базе заказов
export async function addOrder(order) {
    const db = getDatabase();
    const Orders = await ref(db, 'Orders');
    let snapshot = await get(Orders)
    let data = await snapshot.val();
    console.log(data);
    order['time'] = Date.now()
    const addOrder = push(Orders);
    set(addOrder, order);
}

// обновление заказа - выполнен/ не выполнен
export async function updateOrderInFireBase(order) {
    console.log(order);
    const db = getDatabase();
    const currentDB = await ref(db, 'Orders');
    let snapshot = await get(currentDB)
    let data = await snapshot.val();
    console.log(data);
    for (const key in data) {
        if (data[key].orderId === order.orderId) {
            console.log("key", key, '------- id =', order.orderId);
            // set(ref(db, `Orders/${key}`), order)
            update(ref(db, `Orders/${key}`), order)

        }
    }
}

// ищем order по айди заказа
export async function findOrderInFireBaseByID(id) {
    console.log(id);
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
        // console.log(data[key].orderId, "===", id);
        if (data[key].orderId === id) {
            // console.log("key", key, '------- id =', id);
            remove(ref(db, `/${link}/${key}`))
        }
    }
}

//
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


//----------------------------------------------------

const DatabaseService = () => {

    const db = getDatabase();
    // const allDataBase = ref(db, '/');
    const Burgers = ref(db, 'Burgers');

    //read all data => children onValue
    onValue(Burgers, (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
            if (data[key].id === undefined) {
                console.log("key", key);
                set(ref(db, `Burgers/${key}`), { ...data[key], id: str_randLen(6) })
            }
        }
    });


    // let key = "-N9OeGs-D0PFWizuH0Yk"
    // //читаем объект по ключу базы
    // const infoInObject = ref(db, `Burgers/${key}/about`);
    // onValue(infoInObject, (snapshot) => {
    //     const data = snapshot.val();
    // });

    return (
        <div></div>
    )
}

export default DatabaseService