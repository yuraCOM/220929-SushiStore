import React, { useState, useEffect } from "react"
import './styleSlider8.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { observer } from "mobx-react-lite";


const SliderInfinity = observer(() => {

    const [arrItem, setArrItem] = useState([])

    useEffect(() => {
        let arr = []

        for (let index = 0; index < 10; index++) {
            const element = Math.floor(Math.random() * 120);
            if (!arr.includes(element) || element !== 0) {
                arr.push(<img src={`https://randomfox.ca/images/${element}.jpg`} alt={element} />)
            }
        }
        setArrItem(arr)
    }, [])

    // let items = []
    // items = arrItem.map(item =>
    //     <div>
    //         {item}
    //         {/* <p>{item.weight}</p> */}
    //         {/* <p>{item.name}</p> */}
    //         {/* <img src={`${linkSrc}${item.img}`} alt={item.img} /> */}
    //         {/* <img src={`https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/${item.img}`} alt="" /> */}
    //     </div >
    // )


    let r = {
        0: {
            items: 3,
        },
    }

    return (
        <div>
            <AliceCarousel mouseTracking infinite disableDotsControls responsive={r} items={arrItem} />
        </div >
    )
})

export default SliderInfinity