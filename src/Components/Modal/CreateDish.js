import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { MainStore } from '../../Store/MainStore'
import './styleCreateDish.css'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { randomN } from '../../Tools/random';
import { addToBase } from '../../Tools/assist';
import { storage } from "../../FireBase/firebase";
import { ref, uploadBytes } from 'firebase/storage';



// @ts-ignore
const CreateDish = observer(({ show, onHide }) => {

    let shopStore = MainStore.shopStore

    let sampleItem = {
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


    const [newDish, setNewDish] = useState(sampleItem)

    const [name, setName] = useState('')

    const [storeMenu, setStore] = useState('')
    const [defMenu, setDefMenu] = useState('DEFAULT')

    const [storeType, setStoreType] = useState('')
    const [defType, setDefType] = useState('DEFAULT')

    const [kind, setKind] = useState('')

    const [qnty, setQnty] = useState(0)

    const [weight, setWeight] = useState(0)

    const [price, setPrice] = useState(0)

    const [about, setAbout] = useState('')
    const [diffInfo, setDiffInfo] = useState('')

    // eslint-disable-next-line no-unused-vars
    const [img, setImg] = useState('')
    const [fileImage, setFileImage] = useState(null)


    useEffect(() => {

        // пункты меню - для выпадающего списка
        // eslint-disable-next-line array-callback-return
        let storeMenuArr = shopStore.menuStart.map(item => {
            for (const [key, value] of Object.entries(item)) {
                return <option key={randomN()} value={key}>{value.toUpperCase()}</option>
            }
        })
        // @ts-ignore
        setStore(storeMenuArr)

        // eslint-disable-next-line array-callback-return
        let storeTypeArr = shopStore.menuType.map(item => {
            for (const [key, value] of Object.entries(item)) {
                return <option key={randomN()} value={key}>{value.toUpperCase()}</option>
            }
        })
        // @ts-ignore
        setStoreType(storeTypeArr)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const addDish = (e) => {
        e.preventDefault();

        if (newDish.store === '') {
            alert("Введите вид блюда...")
        }
        else if (newDish.store === "SushiBar" && newDish.type === '') {
            alert("Введите тип блюда...")
        }
        else if (newDish.name === '') {
            alert("Введите название блюда...")
        }
        else if (newDish.price === 0) {
            alert("Введите стоимость блюда...")
        }
        else if (newDish.qnty === 0) {
            alert("Введите кол-во единиц в блюде")
        }
        else if (newDish.weight === 0) {
            alert("Введите вес блюда в граммах..")
        }
        else if (newDish.img === '') {
            alert("+++Add image!!!")
        }
        else {
            // console.log('create', newDish);
            // const file = e.target.files[0]
            setName("")
            setDefMenu("DEFAULT")
            setDefType("DEFAULT")
            setKind('')
            setQnty(0)
            setWeight(0)
            setPrice(0)
            setAbout('')
            setDiffInfo('')
            setImg('')
            setNewDish(sampleItem)
            addToBase(e, newDish)
            uploadFiles(fileImage)
            onHide()
        }
    }

    const uploadFiles = (file) => {
        if (!file) return
        const storageRef = ref(storage, `images/${file.name}`)
        // @ts-ignore
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

    };

    return (
        <Modal className='modal-add-new-dish'
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Dish
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form action="submite" onSubmit={(
                    // @ts-ignore
                    e) => { console.log("data"); }}>
                    <div className='flex-col'>
                        <div>
                            {/* store select - общее меню */}
                            <select name="menuFood" value={defMenu} onChange={(e) => {
                                setDefMenu(e.target.value)
                                setNewDish({ ...newDish, 'store': e.target.value })
                            }}>
                                <option disabled value="DEFAULT">Меню</option>
                                {storeMenu}
                            </select>

                            {/* type dish - типы блюд */}
                            {newDish.store === "SushiBar" ?
                                <select name="typeFood" value={defType} onChange={(e) => {
                                    setDefType(e.target.value)
                                    setNewDish({ ...newDish, 'type': e.target.value })
                                }}>
                                    <option disabled value="DEFAULT">Тип Меню</option>
                                    {storeType}
                                </select>
                                : false
                            }
                        </div>

                        {/* под меню раздел */}
                        <input type="text" placeholder='Под-меню(не обязательно)' value={kind || ""}
                            onChange={(e) => {
                                setNewDish({ ...newDish, 'kind': e.target.value })
                                setKind(e.target.value)

                            }}>
                        </input>

                        {/* name */}
                        <input required={true} type="text" placeholder='Название' value={name || ""}
                            onChange={(e) => {
                                setNewDish({ ...newDish, 'name': e.target.value })
                                setName(e.target.value)
                            }}>
                        </input>

                        {/* price */}
                        <div >
                            Price:
                            <input required={true} type="number" min={0} value={price}
                                onChange={(e) => {
                                    setNewDish({ ...newDish, 'price': Number(e.target.value) })
                                    // @ts-ignore
                                    setPrice(e.target.value)
                                }}>

                            </input>
                        </div>

                        {/* qnty */}
                        <div>
                            Кол-во единиц в блюде:
                            <input type="number" min={0} value={qnty}
                                onChange={(e) => {
                                    setNewDish({ ...newDish, 'qnty': Number(e.target.value) })
                                    // @ts-ignore
                                    setQnty(e.target.value)
                                }}>
                            </input>
                        </div>

                        {/* weight */}
                        <div>
                            Вес гр.:
                            <input type="number" min={0} value={weight}
                                onChange={(e) => {
                                    setNewDish({ ...newDish, 'weight': Number(e.target.value) })
                                    // @ts-ignore
                                    setWeight(e.target.value)
                                }}>
                            </input>
                        </div>

                        {/* about */}
                        <textarea
                            // @ts-ignore
                            type="text" placeholder='Описание' value={about || ""}
                            onChange={(e) => {
                                setNewDish({ ...newDish, 'about': e.target.value })
                                setAbout(e.target.value)
                            }}>
                        </textarea>
                        {/* diff info */}
                        <textarea placeholder='Различная информация' value={diffInfo || ""}
                            onChange={(e) => {
                                setNewDish({ ...newDish, 'diffInfo': e.target.value })
                                setDiffInfo(e.target.value)
                            }}>
                        </textarea>
                        {/* название файла */}
                        {/* <input required={true} type="text" placeholder='Название файла ("b02.jpg")' value={img || ""}
                            onChange={(e) => {
                                setNewDish({ ...newDish, 'img': e.target.value })
                                setImg(e.target.value)
                            }}>
                        </input> */}
                        <input type="file" onChange={(e) => {
                            // @ts-ignore
                            setNewDish({ ...newDish, 'img': e.target.files[0].name })
                            // @ts-ignore
                            setFileImage(e.target.files[0])
                        }} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={(e) => addDish(e)} >Добавить</Button>
            </Modal.Footer>
        </Modal >
    )
})

export default CreateDish

