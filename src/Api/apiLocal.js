
import React from 'react'

// const ApiLocal = () => {

//     // let url = 'https://my-json-server.typicode.com/yuraCOM/DataBase/db'
//     // let url = 'https://yuracom.github.io/DataBase/db.json'
//     let url = 'https://jsonserver-my.herokuapp.com/'
//     const response = async () => await fetch(url);
//     response().then(data => data.json()).then(data => console.log(data))

//     getMe() {
//         console.log(this.performRequest(`${this.url}/me`));
//         return this.performRequest(`${this.url}/me`)
//     }

//     return (
//         <div>apiLocyal</div>
//     )
// }

// export default ApiLocal





class ApiLocal {
    // url = '/public/DataBases/postsData.json'
    url = 'https://jsonserver-my.herokuapp.com'

    performRequest(url, method = 'GET', body) {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(response => response.json()).then(data => data)
    }

    getAll() {
        return this.performRequest(`${this.url}/db`)
    }

    addInDB(data) {
        return this.performRequest(`${this.url}/db`, 'POST', data)
    }

    getUsers() {

        return this.performRequest(`${this.url}/users`)
    }

    addUser(data) {
        return this.performRequest(`${this.url}/users`, 'POST', data)

    }
    delUser(id) {
        return this.performRequest(`${this.url}/users/${id}`, 'DELETE')
    }


    getMe() {
        // console.log(this.performRequest(`${this.url}/me`));
        return this.performRequest(`${this.url}/me`)
    }

    getPosts() {
        return this.performRequest(`${this.url}/posts`)
    }

    addPost(data) {
        return this.performRequest(`${this.url}/posts`, 'POST', data)
    }

    removePost(id) {
        return this.performRequest(`${this.url}/posts/${id}`, 'DELETE')
    }
}

export default new ApiLocal()

let x = new ApiLocal()
x.getAll().then(data => console.log(data))

let newUser = {
    "brands": [
        { "brandName": "Samsung", }
    ]
    //     "username": "AAAA",
    //     "age": 33,
    //     "favourite_music_genre": "JazzVVVV",
    //     "preferred_programming_language": "Javascript REACT",
    //     "best_frontend_framework": "REACT",
}

// x.addUser(newUser)

// x.delUser(1000)

let dataN = { "brands": [] }

// x.addInDB(dataN)


