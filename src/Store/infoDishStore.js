import { makeAutoObservable } from "mobx";


export default class infoDishStore {

    infoDish = {}

    show = false
    isBasketBtn = true

    constructor() {
        makeAutoObservable(this)
    }

    hideMsg() {
        this.show = false
        this.infoDish = {}
    }

    showMsg() {
        this.show = true
    }

    setDish(item) {
        this.infoDish = item
    }

    setIsBasketBtn(bool) {
        this.isBasketBtn = bool
    }


}