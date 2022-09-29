import React from 'react'
import { Navigate } from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Orders from './Components/Admin/Orders/Orders'
import Authorization from './Components/Authorization/Authorization'
import Basket from './Components/Basket/Basket'
import Cabinet from './Components/Cabinet/Cabinet'
import Menu from './Components/Menu/Menu'
import Slider from './Components/Slider/Slider'
import Slider8 from './Components/Slider8/Slider8'
import { ADMIN_ROUTE, BASKET_ROUTE, CABINET_ROUTE, LOGIN_ROUTE, MENU_ROUTE, ORDERS_ROUTE, REGISTRATION_ROUTE, SLIDER_INF } from './Tools/consts'


export const authRoutes = [
    {
        path: '/',
        Component: Slider
    },
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: SLIDER_INF,
        Component: Slider8
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: CABINET_ROUTE,
        Component: Cabinet
    },
    {
        path: "*",
        // Component: Slider
        Component: (() => < Navigate to="/" />)
    }
]

export const publicRoutes = [
    {
        path: '/',
        Component: Slider
    },
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: SLIDER_INF,
        Component: Slider8
    },

    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Authorization
    },
    {
        path: '*',
        Component: (() => < Navigate to="/" />)
    },

]