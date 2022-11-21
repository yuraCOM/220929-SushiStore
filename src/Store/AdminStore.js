import { makeAutoObservable } from "mobx";


export default class AdminStore {

    qtyNewOrders = 0

    constructor() {
        makeAutoObservable(this)
    }

    setNewOrders(num) {
        this.qtyNewOrders = num
    }

}
