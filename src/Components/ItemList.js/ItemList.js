import { observer } from 'mobx-react-lite';
import React from 'react'
import { MainStore } from '../../Store/MainStore';
import Item from '../Item/Item'
import Loader from '../Loader/Loader';
import './styleItemList.css'

const ItemList = observer((props) => {
    let shopStore = MainStore.shopStore
    return (
        <div className='item-list'>
            <div className="order_blocks">
                {shopStore.currenMenu.length === 0 ? < Loader /> : false}
                {shopStore.virtualMenu.map(item => <Item key={item.id} data={item}></Item>)}
            </div>
        </div>
    )
})

export default ItemList


