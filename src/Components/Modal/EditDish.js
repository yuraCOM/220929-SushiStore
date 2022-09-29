import { observer } from 'mobx-react-lite';
import React from 'react'
import { MainStore } from '../../Store/MainStore'
import './styleCreateDish.css'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { randomN } from '../../Tools/random';
import { editDishInFB } from '../../FireBase/DatabaseService';


const EditDish = observer(({ show, onHide }) => {
    // const linkSrc = "https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/"


    let shopStore = MainStore.shopStore
    let linkSrc = shopStore.linkImgDB
    let dishUPD = shopStore.editSelectedDish
    let updateDish = { ...dishUPD } //виртуальна копия блюда, чтоб потом после измен сохранить в базу

    // console.log(dishUPD);

    let dish = {
        // id - генерит авто рендом - при добавлении в базу addToBase
        "name": "", //
        "store": "",//сушибар/ суп/ салат - основное меню
        "type": "",//  например суши бар - ролы/суши/гунканы/ сеты - 
        "kind": "",// лайт меню/жареные/ сеты - это больше к суши бару
        "price": 0,//
        "qnty": 0,//
        "weight": 0,//
        "about": "",//
        "diffInfo": "",//
        "img": ""
    }

    let sampleDish = Object.keys(shopStore.sampleDish)

    function updDish(e, key) {
        e.preventDefault()
        let txt = e.target.value
        updateDish[key] = txt
    }

    //updateDish in FireBase
    const saveUpdateDish = (e) => {
        e.preventDefault()
        // console.log(updateDish);
        shopStore.updateSelectedDish(updateDish)
        console.log(updateDish);
        editDishInFB(dishUPD.id, updateDish.store, updateDish)
        onHide()
    }

    return (
        <Modal className='modal-add-new-dish'
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    EditDish
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dishUPD === undefined ? <p>No such food</p> :
                    sampleDish.map(key =>
                        <div key={randomN()} className='flex-left'>
                            <p>{key}</p>
                            <textarea defaultValue={dishUPD[key]}
                                onChange={(e) => updDish(e, key)}>
                            </textarea>
                        </div >
                    )
                }
                {
                    dishUPD === undefined ? false : <img className="trigger-click"
                        src={`${linkSrc}${dishUPD.img}`} alt={dish.name}>
                    </img>
                }


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={(e) => saveUpdateDish(e)} >Save Update</Button>
            </Modal.Footer>
        </Modal >
    )
})

export default EditDish

