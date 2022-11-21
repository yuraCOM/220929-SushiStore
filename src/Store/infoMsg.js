import { makeAutoObservable } from "mobx";
import React from "react";


export default class infoMsg {

    infoMsgBD = {
        startMsg: <div>
            <p> Чтобы попасть в админ-панель: Вход админа: Login: 0  Pass: 0 </p>
            <p>В админ панели можно: добавлять, редактировать, удалять блюда.</p>
            <p>Так же мониторить все заказы - получить всю информацию по заказу, информацию по клиенту,
                отметить готовность заказа, удалить заказ из базы.
            </p>
            <p>Под админом есть возможность - убрать/спрятать блюда в меню</p>
            <hr></hr>
            <p>Клиент - простая регистрация(не усложнял для демонстрации).
                У клиента есть кабинет - можно править его данные, показаны все его заказы,
                при заказе формируется корзина Клиента.</p>
            <p>Для базы данных использован FireBase(live), через сервис также реализовано хранение картинок блюд.</p>
        </div>,

        singIn: `Sing in...(login) or Sign up...
        Чтобы сделать заказ - войдите или зарегестрируйтесь!`,

        basketMsg: ``
    }

    show = false

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
