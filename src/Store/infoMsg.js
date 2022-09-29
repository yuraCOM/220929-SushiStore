import { makeAutoObservable } from "mobx";


export default class infoMsg {

    infoMsgBD = {

        startMsg: `Вход админа:
                Login: 0
                Pass: 0
                `,

        singIn: `Sing in...(login) or Sign up...
        Чтобы сделать заказ - войдите или зарегестрируйтесь!`,

        basketMsg: ``
    }

    show = true

    msg = this.infoMsgBD.startMsg

    constructor() {
        makeAutoObservable(this)
    }

    hideMsg() {
        this.show = false
        this.msg = ''
    }

    showMsg() {
        this.show = true
    }

    setMsg(txt) {
        this.msg = txt
    }


}