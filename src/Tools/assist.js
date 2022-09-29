import { addOneDishInFireBase, findOrdersByIdUser, readCurrentMenu } from "../FireBase/DatabaseService"
import { MainStore } from "../Store/MainStore"
import { str_randLen } from "./random"


let shopStore = MainStore.shopStore
let userStore = MainStore.userNow


// вызываем меню для отображения
async function callMenuTypeFood(name) {

    shopStore.setCurrentTypeMenu(name)
    shopStore.setCureentKind('')

    // let CurrenSectionMenu = await shopStore.getCurrenSectionMenu(name)
    let CurrenSectionMenu = await readCurrentMenu(name)

    shopStore.setCurrentMenu(await CurrenSectionMenu)

    shopStore.setCurrentSecondTypeMenu(CurrenSectionMenu)

    shopStore.setVirtualMenu(CurrenSectionMenu)
}

// функция добавить блюдо в базу данных
function addToBase(e, data) {
    data.id = str_randLen(6)
    console.log(data);
    // shopStore.addOneDishToMenu(data)
    addOneDishInFireBase(data)
}

//получаем ВСЕ заказы из базы
let getOrders = async () => {
    let dataOrders = await readCurrentMenu("Orders")
    dataOrders.sort((a, b) => a.time < b.time ? 1 : -1);

    return await dataOrders
    // setOrders(await dataOrders);
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

export { callMenuTypeFood, addToBase, getOrders, getUserOrders, checkDishInBasket, addDishInUserStore }