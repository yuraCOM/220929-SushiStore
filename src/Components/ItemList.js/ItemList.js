import { observer } from 'mobx-react-lite';
import React from 'react'
import { MainStore } from '../../Store/MainStore';
import Item from '../Item/Item'
import './styleItemList.css'



const ItemList = observer((props) => {
    let shopStore = MainStore.shopStore

    return (
        <div className='item-list'>
            <div className="order_blocks">
                {shopStore.currenMenu.length === 0 ? <h1>LOADING.........</h1> : false}
                {shopStore.virtualMenu.map(item => <Item key={item.id} data={item}></Item>)}


                {/* {shopStore.currentSecondTypeMenu  ?
                    shopStore.currentSecondTypeMenu.map(item => <Item key={item.id} data={item}></Item>)
                    : false
                } */}



                {/* {shopStore.currentSecondType && shopStore.currentKind ?
                    shopStore.cureentKindMenu.map(item => <Item key={item.id} data={item}></Item>) :
                    shopStore.currenMenu.map(item => <Item key={item.id} data={item}></Item>)
                } */}

                {/* {shopStore.currentSecondType && !shopStore.currentKind ?
                    shopStore.currentSecondTypeMenu.map(item => <Item key={item.id} data={item}></Item>) :
                    shopStore.currenMenu.map(item => <Item key={item.id} data={item}></Item>)
                } */}



            </div>
        </div>

    )
})

export default ItemList


