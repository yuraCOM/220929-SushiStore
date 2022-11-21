import { makeAutoObservable } from "mobx";


export default class UserStore {

    sampleUser = {
        "regTime": "",
        "id": "",
        "userName": "",
        "userPassword": "",
        "userRole": "",
        "userEmail": "",
        "userPhone": "",
        "userDeliveryPlace": "",
    }


    isAuth = false // потом изменить на false
    user = {}

    userOrders = []

    userBasket = []
    userBasketTotalSum = 0

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setUserOrders(data) {
        this.userOrders = data
    }

    setUserBasket(dish) {
        this.userBasket.push(dish)
    }

    updateUserBasket(data) {
        this.userBasket = data
    }

    clearUser() {
        this.isAuth = false
        this.user = {}
        this.userOrders = []
        this.userBasket = []
        this.userBasketTotalSum = 0
    }

    get countUserBasketTotalSum() {
        let totalSum = 0
        this.userBasket.forEach(item => {
            totalSum += item.price * item.orderQty
        })

        return totalSum
    }



}