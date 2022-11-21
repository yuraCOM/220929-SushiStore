import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { MainStore } from '../../Store/MainStore'
import { randomN } from '../../Tools/random'
import CreateDish from '../Modal/CreateDish'
import './styleAdmin.css'
import { addToBase } from '../../Tools/assist'
import { delDishFromFireBase, fetchDishInFB, readAllFireStoreDB } from '../../FireBase/DatabaseService'
import EditDish from '../Modal/EditDish'
import UserStore from '../../Store/UserStore'
import { useNavigate } from 'react-router-dom'


const Admin = observer((props) => {

    const navigate = useNavigate();

    let shopStore = MainStore.shopStore
    let userStore = MainStore.userNow

    const [startMenu, setStartMenu] = useState([])

    const [addDishVisible, setAddDishVisible] = useState(false)
    const [updateDishVisible, setUpdAddDishVisible] = useState(false)

    const [defType, setDefType] = useState('DEFAULT')

    //удаление блюда по айди и типу
    const [id, setId] = useState(null)
    const [typeFood, setTypeFood] = useState('')
    //--------------------------------------------------
    // edit dish in farebase

    const [idEditDish, setIdEditDish] = useState(null)
    const [editTypeFood, setEditTypeFood] = useState('')
    const [editT, setEditT] = useState('DEFAULT')

    // ---------------

    useEffect(() => {

        // eslint-disable-next-line array-callback-return
        let mainMainBtnBlock = shopStore.menuStart.map(item => {
            for (const [key, value] of Object.entries(item)) {
                return <option key={randomN()} value={key}>{value.toUpperCase()}</option>
            }
        })
        setStartMenu(mainMainBtnBlock)

        if (localStorage.userSushi) {
            let data = JSON.parse(localStorage.getItem('userSushi'))
            userStore.setIsAuth(true)
            userStore.setUser(data)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (localStorage.userSushi) {
            let data = JSON.parse(localStorage.getItem('userSushi'))
            userStore.setIsAuth(true)
            userStore.setUser(data)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStore.isAuth, UserStore.editSelectedDish])

    let newSushiBar = {
        // "id": Math.ceil((Math.random() * Math.random()) * 1000000),
        // "artikul": Math.ceil((Math.random() * Math.random()) * 1000000),
        "name": "Сет 1",
        "store": "SushiBar",
        "type": "sets",
        "kind": 'Сеты',
        "price": 899,
        "about": "Ролл №1 Филадельфия в кунжуте(Крем- сыр, Огурец, Кунжут, Унаги, Лосось) 8 штук 295 г..... Ролл №2 Филадельфия комбо(Лосось копченый, Угорь.Крем - сыр, Огурец, Авокадо, Кунжут, Унаги) 8 штук 330 г..... Ролл №3 Хиросима(Креветка, Крабовый микс, Крем - сыр, Манго, Манго соус) 8 штук 320 г..... Пищевая ценность в продукте: Энергетическая ценность / Калории – 1427 ккал. Общее содержание жиров – 77, 25 г. Углеводы – 123 г. Белки – 71, 5 г.",
        "qnty": 8,
        "weight": 950,
        "img": "s11.jpg"
    }

    let newPizza = {
        // "id": Math.ceil((Math.random() * Math.random()) * 1000000),
        // "artikul": Math.ceil(Math.random() * 1000000),
        "name": "ПІЦА DOUBLE CHEESE",
        "store": "Pizza",
        "type": "",
        "price": 255,
        "about": "Куряче стегно, джем бекон, цибуля, маринований огірок, сир Чедер, сир Моцарела, соус Барбекю",
        "qnty": 1,
        "weight": 500,
        "img": "p05.jpg"
    }

    let newBurger = {
        // "id": Math.ceil((Math.random() * Math.random()) * 1000000),
        // "artikul": Math.ceil(Math.random() * 1000000),
        "name": "Chicken white",
        "store": "Burgers",
        "type": "",
        "kind": "Акция",
        "price": 200,
        "about": "Куряча котлета, бекон, сир чеддер, салат ромен, томат, соус тартар, картопля фрі, пікантний соус",
        "qnty": 1,
        "weight": 300,
        "img": "b02.jpg"
    }

    //удаление блюда с базы по artikul & type   id = artikul в товаре
    function delFromBase(e) {
        e.preventDefault();
        if (!id) {
            alert('Enter dish ID')
        }
        else if (!typeFood) {
            alert('Enter type of food')
        }
        else {
            let answer = window.confirm(`Delete ${typeFood} id =${id} `)
            answer && shopStore.delOneDishFromMenu(id, typeFood)
            delDishFromFireBase(id, typeFood)
            setId(null)
            setTypeFood("")
            setDefType("DEFAULT")
        }

    }

    //обновление данных по выбранному айди блюда
    async function editDishInFireBase(e) {
        e.preventDefault();
        if (!idEditDish) {
            alert('Enter dish ID')
        }
        else if (!editTypeFood) {
            alert('Enter type of food')
        } else {
            let dish = await fetchDishInFB(idEditDish, editTypeFood)
            // console.log(JSON.stringify(dish));
            shopStore.updateSelectedDish(await dish)
            setUpdAddDishVisible(true)
            setIdEditDish(null)
            setEditTypeFood('')
            setEditT("DEFAULT")
        }
    }

    function getOrders() {
        const linkToOrders = () => navigate('/orders', { replace: true })
        linkToOrders()

    }

    function getUsers() {
        const linkToUsers = () => navigate('/users', { replace: true })
        linkToUsers()
    }

    return (
        <div className='cont-mgt85 admin'>

            <div className='add-del-dish flex'>
                <div className='flex-col'>
                    <p>Add New Dish in Menu</p>
                    <p>write all dish info</p>
                    <button type="submit" onClick={(e) => setAddDishVisible(true)}>Add New Dish</button>
                </div>

                {/* edit dish in firebase */}
                <div className='flex-col'>
                    <p>Edit Dish</p>
                    <form className='flex-col' action="submite">
                        <input type="text" placeholder='id' value={idEditDish || ""}
                            onChange={(e) => setIdEditDish(e.target.value)}>
                        </input>
                        <select name="typeFood" value={editT} onChange={(e) => {
                            setEditTypeFood(e.target.value)
                            setEditT(e.target.value)
                        }}>
                            <option disabled value="DEFAULT">Type of Food</option>
                            {startMenu}
                        </select>
                        <button type="submit" onClick={(e) => { editDishInFireBase(e) }} >Edit</button>
                    </form>
                </div>


                {/* dell по айди из конкртеного меню */}
                <div className='flex-col'>
                    <form className='flex-col' action="submite">
                        <p>Delete dish by ID </p>
                        <input type="text" placeholder='id' value={id || ""}
                            onChange={(e) => setId(e.target.value)}>
                        </input>
                        <select name="typeFood" value={defType} onChange={(e) => {
                            setTypeFood(e.target.value)
                            setDefType(e.target.value)
                        }}>
                            <option disabled value="DEFAULT">Type of Food</option>
                            {startMenu}
                            {/* {startMenu.map((item) => <option value={item}>{item}</option>)} */}

                        </select>
                        <button type="submit" onClick={(e) => { delFromBase(e) }} >Delete</button>
                    </form>
                </div>
            </div>

            <hr></hr>
            <div className="firebase-container">
                <h5>Firebase Store</h5>
                <div className="flex-col firebase">
                    <button onClick={(e) => getOrders()}>All Orders</button>
                    <button onClick={(e) => getUsers()}>All Users</button>
                </div>
            </div>



            <hr></hr>
            <p>+Add готовые заготовки- для тестов</p>
            {/* это готовые заготовки по добавлению - уберу потом */}
            <div className='flex' >
                {/* add sushi */}
                <button onClick={(e) => addToBase(e, newSushiBar)}>Add SushiBar </button>

                {/* add pizza */}
                <button onClick={(e) => addToBase(e, newPizza)} >Add ONE Pizza</button>

                {/* add burger */}
                <button onClick={(e) => addToBase(e, newBurger)}>
                    Add ONE Burger
                </button>
                {/* add one user test */}
                {/* <button onClick={(e) => addUserInBase(user1)}> addUser</button> */}
                {/* add Order */}
                {/* <button onClick={(e) => addOrder(order)}> addOrder</button> */}
            </div>

            <hr></hr>
            {/* <button onClick={(e) => readCurrentMenu("Burgers")}> read Burgers</button> */}
            {/* <button onClick={() => addOrder(order)}>add order</button> */}
            <button onClick={(e) => readAllFireStoreDB()}> readAllFireStoreDB</button>
            <button onClick={(e) => readAllFireStoreDB()}> readAllUsers</button>

            {/* modal ------- */}
            <CreateDish show={addDishVisible} onHide={() => setAddDishVisible(false)} />
            <EditDish show={updateDishVisible} onHide={() => setUpdAddDishVisible(false)} />

        </div >
    )
})

export default Admin