import React from 'react'
import './styleMenu.css'
import { MainStore } from '../../Store/MainStore'
import { observer } from 'mobx-react-lite'
import { randomN } from '../../Tools/random'

const KindMenu = observer(() => {

    let shopStore = MainStore.shopStore
    let secondMenu = shopStore.currentSecondTypeMenu

    let arrKind = secondMenu.map((element) => {
        if (element.kind === undefined || element.kind === '' || element.kind === "") {
            return false
        }
        else {
            return element.kind
        }
    })

    arrKind = [...new Set(arrKind)]
    let x = []

    arrKind.forEach(item => {
        if (item) {
            x.push(item)
        }
    })

    let btn = x.map(i => {
        return (
            i ? <button
                key={i + 'kind'}
                className={shopStore.currentKind === i ?
                    'field__nav__link kind-btn menuBtnKindActive' :
                    'field__nav__link kind-btn'}
                onClick={() => menuBtnHundler(i)}>{i}</button>
                : false
        )
    })

    async function menuBtnHundler(nameKind) {
        shopStore.setVirtualMenu(shopStore.currentSecondTypeMenu)

        if (nameKind === 'All') {
            shopStore.setCureentKind('')

        }
        else {
            let filterKind = shopStore.virtualMenu.filter(i => i.kind === nameKind)
            shopStore.setVirtualMenu(filterKind)

            shopStore.setCureentKind(await nameKind)
            let kindsMenu = await shopStore.fetchKindMenu(await shopStore.currentType, await shopStore.currentKind)
            shopStore.setCureentKindMenu(await kindsMenu)
        }
    }

    return (
        <div className='flex-left'>
            {x.length !== 0 ?
                <div className='flex-left'>
                    <button
                        key={randomN()}
                        className={shopStore.currentKind === '' ? 'field__nav__link kind-btn menuBtnKindActive' : 'field__nav__link kind-btn'}
                        onClick={() => menuBtnHundler('All')}>All
                    </button>
                    {btn}
                </div> :
                false}
        </div>
    )
})

export default KindMenu