import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { addOneUserInFireBase, readAllUsersFireStore, readONEUsersFireStore } from '../../FireBase/DatabaseService'
import { MainStore } from '../../Store/MainStore'
import { LOGIN_ROUTE, MENU_ROUTE, REGISTRATION_ROUTE } from '../../Tools/consts'
import { str_randLen } from '../../Tools/random'
import './styleAuth.css'
import toast, { Toaster } from 'react-hot-toast';




const Authorization = observer(() => {

    let authToast = toast

    let currenUserNow = MainStore.userNow

    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isRegistration = location.pathname === REGISTRATION_ROUTE

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        if (login === '') {
            alert('Enter Login')
        }
        else if (password === '') {
            alert('Enter Password')
        }

        let fireStoreUsers = await readAllUsersFireStore()
        let dataUser = await readONEUsersFireStore(login, password)

        let fireStoreUsersName = await fireStoreUsers.map(i => i.userName)

        let getCurrentUserInfo = await fireStoreUsers.filter(item => item.userName === login)
        getCurrentUserInfo = getCurrentUserInfo[0]

        if (isLogin && dataUser.auth === true) {
            if (fireStoreUsersName.includes(login)) {
                if (getCurrentUserInfo.userPassword === password) {
                    currenUserNow.setIsAuth(true)
                    currenUserNow.setUser(getCurrentUserInfo)
                    let data = JSON.stringify(getCurrentUserInfo);
                    localStorage.setItem('userSushi', data);
                    history(MENU_ROUTE)
                }
                else {
                    alert('Не верный Пароль !!!')
                }
            }
            if (!fireStoreUsersName.includes(login)) {
                alert('Нет такого пользователя - зарегистрируйтесь !!!')
            }
        }
        if (isLogin && !dataUser.auth) {
            alert(dataUser.messg)
        }

        //регистрация - надо переписать проверку на сервере в базе
        if (isRegistration && login && password) {
            if (fireStoreUsersName.includes(login)) {
                alert('Есть такой Юзер/Логин')
            }
            else {
                let user = { ...MainStore.userNow.sampleUser }
                user["regTime"] = moment(Date.now()).format('MMM Do YY, h:mm: a')
                user["id"] = str_randLen(7)
                user["userName"] = login
                user["userPassword"] = password
                addOneUserInFireBase(user)
                authToast.success('Successfully!')
                authToast.success(`Sign in with ${login}`)
                history('/login')
            }
        }
    }

    return (
        <Container className="cont-mgt85 d-flex justify-content-center align-items-center ">
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto" style={{ color: isLogin ? '#2196f3' : '#ffc107' }}
                >{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш Login..."
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }} >
                        {isLogin ?
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <p className='pAuth'>Нет аккаунта? жми =></p> <NavLink className='aAuth' to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            : <div style={{ display: "flex", alignItems: "center" }} >
                                <p className='pAuth'>Есть аккаунт? жми =></p> <NavLink className='aAuth' to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>}
                        <Button className="mt-3 align-self-end"
                            style={{ color: isLogin ? '#2196f3' : '#ffc107' }}
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>

                    </div>
                </Form>
            </Card>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </Container>
    )
})

export default Authorization