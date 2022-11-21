import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllUsers, delUserInFireBase } from '../../../FireBase/DatabaseService';
import { MainStore } from '../../../Store/MainStore';
import { randomN } from '../../../Tools/random';
import Loader from '../../Loader/Loader';
import InfoModalUser from '../../Modal/InfoModalUser';
import Search from '../../Search/Search';
import "./usersStyle.css"

const Users = () => {

    let sampleUser = Object.keys(MainStore.userNow.sampleUser) // шаблон юзера

    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [showUserUpd, hideShowUserInfo] = useState(false)
    const [findFlag, setFindFlag] = useState(false)


    useEffect(() => {
        fetchData()
    }, [])

    //костыль обновления компонента users
    useEffect(() => {
        !findFlag && fetchData()
    }, [allUsers.length])

    async function fetchData() {
        setAllUsers(await getAllUsers())
    }

    function userInfo(user) {
        return (
            sampleUser.map(key =>
                user[key] ? <p key={key + 'users'}> <u>{key}:</u> <b>{user[key]}</b></p > :
                    <p key={key + 'users'} style={{ backgroundColor: 'red' }}>{key} : <b>--------</b></p >
            )
        )
    }

    function updUserInfo(user) {
        setSelectedUser(user)
        hideShowUserInfo(true)
    }

    async function delUser(user) {
        await delUserInFireBase(user)
        await fetchData()
    }

    return (
        <div className='userInfo-main' >
            <Search allUsers={allUsers} setAllUsers={setAllUsers} findFlag={findFlag} setFindFlag={setFindFlag} />
            {allUsers.length === 0 ? <Loader /> : allUsers.map(user =>
                <div className='flex user-cont' key={randomN()}>
                    < div className='flex user-info' onClick={() => updUserInfo(user)} >
                        {userInfo(user)}
                    </ div>
                    <div>
                        <Button className='btn-del-order'
                            size="sm"
                            variant="outline-danger"
                            onClick={(e) => delUser(user)}
                        >Х
                        </Button>
                    </div>
                </div>
            )}
            {showUserUpd && <InfoModalUser show={showUserUpd} onHide={() => hideShowUserInfo(false)}
                user={selectedUser} setAllUsers={setAllUsers} updUser={true} setFindFlag={setFindFlag} />}
        </div>
    )
}

export default Users