import React from 'react'
import './styleHeader.css'
import logo from '../img/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MainStore } from '../../Store/MainStore'
import { observer } from 'mobx-react-lite'

const Header = observer(() => {

    let userStore = MainStore.userNow

    const [active, setActive] = useState(false)

    function exit() {
        userStore.clearUser()
        localStorage.removeItem('userSushi');
    }

    return (
        <div className="header">
            <Link to='/'>
                <div className="header_logo"
                    id="logo_mobile"
                >
                    <div className="logo">
                        <img src={logo} alt='logo' />
                    </div>
                </div>
            </Link>
            <Link to='/menu'>
                <div className="header_menu header_hov header_menu_batton" id="menu_mobile">
                    <span></span>
                    Меню
                </div>
            </Link>

            <div className={active ? "active header_naw_wrapper" : "header_naw_wrapper"}>
                <div className="header_burger" onClick={() => active ? setActive(false) : setActive(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="header_nav_mobile" >
                    <ul className="header_nav">
                        <div className="header_li header_logo">
                            <Link to='/'>
                                <div className="logo" >
                                    <img src={logo} alt='logo' />
                                </div>
                            </Link>

                        </div>
                        <div>
                            <div className="header_li header_contact header_number">
                                <a href="tel:7777777777">(777) 777-77-77</a>
                            </div>
                            <div className="header_li header_contact header_time">
                                Пн-Вс,  10:00-20:00
                            </div>
                        </div>

                        <Link to='/menu' className="header_mb10px"
                            onClick={() => active ? setActive(false) : setActive(true)}>
                            <div className="header_li header_hov header_menu_batton">
                                <span></span>
                                Меню
                            </div>
                        </Link>

                        <Link to='/sliderInfinity' className="header_mb10px"
                            onClick={() => active ? setActive(false) : setActive(true)}>
                            <div className="header_li header_hov header_blog "
                            >
                                <span></span>
                                Новости
                            </div>
                        </Link>

                        <div className="header_li header_hov header_cab header_tg header_mb10px"
                            onClick={() => window.open('https://t.me/Tet55555', 'new_window')}>
                            <span></span>
                            <a href="https://t.me/Tet55555" target="blank">Чат-бот</a>
                        </div>
                        {userStore.isAuth ?
                            <Link to="/cabinet" className="header_mb10px"
                                onClick={() => active ? setActive(false) : setActive(true)}>
                                <div className="header_li header_hov header_cab header_cabine"
                                >
                                    <span></span>
                                    Кабинет
                                </div>
                            </Link>
                            :
                            <Link to="/login" className="header_mb10px"
                                onClick={() => active ? setActive(false) : setActive(true)}>
                                <div className="header_li header_hov header_enter "
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <span></span>
                                    Вход
                                </div>
                            </Link>

                        }
                        {userStore.isAuth &&
                            < Link to="/basket" className="header_mb10px"
                                onClick={() => active ? setActive(false) : setActive(true)}>
                                <div className="header_li header_hov header_basket">
                                    <span></span>
                                    Корзина {userStore.userBasket.length > 0 ? <span className='basketQty'>{userStore.userBasket.length}</span> : false}
                                </div>
                            </Link>
                        }

                        {/* надо пилить - если добавил товар в корзину без регистрации */}

                        {userStore.isAuth && userStore.user.userRole === "ADMIN" ?
                            <div className="header_mb10px">
                                <Link to="/admin"
                                    onClick={() => active ? setActive(false) : setActive(true)}>
                                    <div className="header_li header_hov header_admin header_cabine"
                                    >
                                        Админ
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                            :
                            false
                        }
                        {userStore.isAuth ?
                            <Link to="/menu" onClick={() => active ? setActive(false) : setActive(true)}>
                                <div className="header_li header_hov  header_cabine exit"
                                    onClick={() => exit()}
                                >
                                    Выход
                                    <span></span>
                                </div>
                            </Link>
                            :
                            false
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
})


export default React.memo(Header)

