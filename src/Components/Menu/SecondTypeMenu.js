import { observer } from 'mobx-react-lite'
import React from 'react'
import { MainStore } from '../../Store/MainStore'

const SecondTypeMenu = observer(() => {

    let shopStore = MainStore.shopStore

    // eslint-disable-next-line array-callback-return
    let typeBlockSushi = shopStore.menuType.map(item => {
        for (const [key, value] of Object.entries(item)) {
            return <button className={shopStore.currentSecondType === key ? 'menuBtnSecondActive field__nav__link ' : 'field__nav__link'}
                key={key + 'btn'}
                onClick={(e) => menuSecondTypeBtnHundler(key)}>{value.toUpperCase()}</button>
        }
    })


    function menuSecondTypeBtnHundler(keySecondType) {
        shopStore.setVirtualMenu(shopStore.currenMenu)
        shopStore.setCureentKindMenu([])
        shopStore.setCureentKind('')

        shopStore.setCurrentSecondType(keySecondType)
        let arrSecondTypeMenu = shopStore.virtualMenu.filter(item => item.type === shopStore.currentSecondType)

        shopStore.setCurrentSecondTypeMenu(arrSecondTypeMenu)
        shopStore.setVirtualMenu(arrSecondTypeMenu)
    }

    return (
        <div>
            {shopStore.currentType === 'SushiBar' ? <div className=' btn-menu-container btn-menu-second'>
                {typeBlockSushi}
            </div>
                : false}
        </div>
    )
})

export default SecondTypeMenu