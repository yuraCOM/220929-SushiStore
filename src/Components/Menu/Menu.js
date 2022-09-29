import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import './styleMenu.css'
import { MainStore } from '../../Store/MainStore'
import { callMenuTypeFood } from '../../Tools/assist'
import ItemList from '../ItemList.js/ItemList'
import KindMenu from './KindMenu'
import { useEffect } from 'react'
import SecondTypeMenu from './SecondTypeMenu'

const Menu = observer(() => {

    let shopStore = MainStore.shopStore

    const [activeBtn, setActiveBtn] = useState(shopStore.currentType)

    useEffect(() => {
        callMenuTypeFood(shopStore.currentType)
    }, [])


    let mainMainBtnBlock = shopStore.menuStart.map(item => {
        for (const [key, value] of Object.entries(item)) {
            return <button className={activeBtn === key ? 'field__nav__link menuBtnActive' : 'field__nav__link'}
                key={key + 'btn'}
                onClick={(e) => menuBtnHundler(key)}>{value.toUpperCase()}</button>
        }
    })


    function menuBtnHundler(key) {
        shopStore.setCurrentSecondType('')
        shopStore.setCureentKind('')
        shopStore.setCureentKindMenu([])
        // shopStore.setCurrentMenu([])
        callMenuTypeFood(key)
        setActiveBtn(key)
        shopStore.setCurrentTypeMenu(key)
    }

    let hrBlock = <hr style={{
        color: '#000000',
        backgroundColor: '#000000',
        height: .5,
        borderColor: '#000000',
        margin: 0
    }} />

    return (
        <div className='cont-mgt85'>
            {/* <img src="https://firebasestorage.googleapis.com/v0/b/sushistore-4619f.appspot.com/o/1.png?alt=media"></img> */}
            <div className=' btn-menu-container'>
                {mainMainBtnBlock}
                {hrBlock}
            </div>
            <SecondTypeMenu />
            {hrBlock}
            <KindMenu />
            <ItemList ></ItemList>

        </div>

    )
})

export default React.memo(Menu)