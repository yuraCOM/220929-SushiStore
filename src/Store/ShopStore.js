import { makeAutoObservable } from "mobx";
import Api from '../Api/api'
import ApiAxios from "../Api/ApiAxios";



export class ShopStore {

    // linkImgDB = "https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/"
    linkImgDB = (img) => `https://firebasestorage.googleapis.com/v0/b/sushistore-4619f.appspot.com/o/images%2F${img}?alt=media`
    // https://firebasestorage.googleapis.com/v0/b/sushistore-4619f.appspot.com/o/images%2Fmaki03.jpg?alt=media
    url = 'https://jsonserver-my.herokuapp.com'
    // url = 'http://localhost:3001'




    //store - в базе
    menuStart = [
        { "SushiBar": "Суши Бар" },
        { "Pizza": "Пицца" },
        { "Burgers": "Бургеры" },
        { "SaladsSnacks": "САЛАТЫ И ЗАКУСКИ" },
        { "Soups": "Супы" },
        { "HotDishes": "ГОРЯЧИЕ БЛЮДА" },
        { "DrinksSauces": 'Напитки и соусы' },
    ]
    // menuType - это для суши-бара только
    menuType = [
        { "rolls": "Роллы" },
        { "maki": "Маки" },
        { "gunkans": "Гунканы" },
        { "sushi": "Суши" },
        { "sets": "Сеты" },
    ]

    sampleDish = {
        // id - генерит авто рендом - при добавлении в базу addToBase
        "id": "",
        "name": "", //
        "store": "",//сушибар/ суп/ салат - основное меню
        "type": "",//  например суши бар - ролы/суши/гунканы/ сеты - 
        "kind": "",// лайт меню/жареные/ сеты - это больше к суши бару
        "price": 0,//
        "qnty": 0,//
        "weight": 0,//
        "about": "",//
        "diffInfo": "",//
        "img": ""
    }


    allDataShopStore = [];

    // выбор из основное меню
    currentType = 'SushiBar' // выбор основного меню
    currenMenu = [] // массив основного меню

    // выбор подменю - для суши бара
    currentSecondType = '' // выбор подменю - для суши бара
    currentSecondTypeMenu = [] // массив выбор подменю - для суши бара

    currentKind = '' // подвид - веганы, острые и тп
    cureentKindMenu = [] // массив меню подвид - веганы, острые и тп

    //для фильтрации
    virtualMenu = []

    //editSelectedDish - updateSelectedDish
    editSelectedDish = {}

    all = {}

    constructor(params) {
        makeAutoObservable(this)
    }

    //
    updateSelectedDish(data) {
        this.editSelectedDish = data
    }


    setAllStore(data) {
        this.allDataShopStore = data
    }

    setCurrentMenu(data) {
        this.currenMenu = data
    }

    setCurrentTypeMenu(data) {
        this.currentType = data
    }

    setCurrentSecondType(name) {
        this.currentSecondType = name
    }

    setCurrentSecondTypeMenu(data) {
        this.currentSecondTypeMenu = data
    }

    async fetchAllStore() {
        let response = await Api.getAll()
        return response
    }

    //sushi--------------------------------
    //fetchSushiBar - all
    async fetchSushiBar() {
        // console.log(await Api.getSushiBar());
        return await Api.getSushiBar()
    }
    addOneSushiBar(data) {
        Api.addSushiBar(data)
    }

    delOneSushiBar(id) {
        Api.delOneSushiBar(id)
    }

    async fetchSushiBarKind(kind) {
        // console.log(await Api.getSushiBar());
        console.log(ApiAxios.getKind(kind));
        return await ApiAxios.getKind(kind)
    }

    //------------------------
    setCureentKindMenu(menu) {
        this.cureentKindMenu = menu
    }

    setCureentKind(kind) {
        this.currentKind = kind
    }

    //pizza -----------------------
    async fetchAllPizza() {
        return await Api.getAllPizza()
    }
    addOnePizza(data) {
        Api.addOnePizza(data)
    }
    delOnePizza(id) {
        Api.delOnePizza(id)
    }

    //burger
    async fetchAllBurgers() {
        return await Api.getAllBurgers()
    }
    addOneBurger(data) {
        Api.addOneBurger(data)
    }
    delaOneBurger(id) {
        Api.delOneBurger(id)
    }

    //second type menu
    async fetchSecondTypeMenu(type, secondType) {
        console.log(type, secondType);
        return await ApiAxios.getSecondTypeMenu(type, secondType)
    }

    //kind menu
    async fetchKindMenu(type, kind) {
        // console.log(type, kind);

        return await ApiAxios.getKind(type, kind)
    }

    // ------------ общее

    addOneDishToMenu(data) {
        console.log(data);
        return ApiAxios.addOneDishToMenu(data)
    }

    async getCurrenSectionMenu(name) {
        return await ApiAxios.getCurrenSectionMenu(name)
    }

    delOneDishFromMenu(id, typeFood) {
        ApiAxios.delOneDishFromMenu(id, typeFood)
    }

    setVirtualMenu(data) {
        this.virtualMenu = data
    }


}

export default ShopStore