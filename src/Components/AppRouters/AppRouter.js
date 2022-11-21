import { observer } from 'mobx-react-lite';
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../routes';
import { MainStore } from '../../Store/MainStore';
import Slider from '../Slider/Slider';



const AppRouter = observer(() => {

    let currenUserNow = MainStore.userNow

    return (
        <Routes>
            {currenUserNow.isAuth ? authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            ) :
                publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )
            }
            <Route path='/' element={< Navigate to={Slider} />}></Route>
            {/* <Route path='*' element={< Navigate to={Slider} />}></Route> */}
        </Routes >
    )
})

export default AppRouter