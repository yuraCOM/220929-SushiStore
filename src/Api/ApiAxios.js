import { url } from '../Tools/consts';




class ApiAxios {

    url = url

    axios = require('axios').default;

    performRequest(url, method = 'GET', data) {
        return this.axios({
            url,
            method,
            data
        }).then(function (response) {
            return response.data
        });
    }

    getAll() {
        return this.performRequest(`${this.url}/db`)
    }
    getSecondTypeMenu(type, secondType) {
        console.log(type, secondType);
        return this.performRequest(`${this.url}/${type}?type=${secondType}`)
    }

    getKind(type, kind) {
        // console.log(type, kind);
        // console.log(`${this.url}/${type}?kind=${kind}`);
        return this.performRequest(`${this.url}/${type}?kind=${kind}`)
    }

    getInfo() {
        return this.performRequest(`${this.url}/users`)

    }

    addOneDishToMenu(data) {
        return this.performRequest(`${this.url}/${data.store}`, 'POST', data)
    }

    getCurrenSectionMenu(name) {
        return this.performRequest(`${this.url}/${name}`)
    }

    delOneDishFromMenu(id, typeFood) {
        return this.performRequest(`${this.url}/${typeFood}/${id}`, 'DELETE')
    }

    getAllUsers() {
        return this.performRequest(`${this.url}/users`)
    }

    addOneUserInBase(user) {
        return this.performRequest(`${this.url}/users`, 'POST', user)
    }

}

export default new ApiAxios()






