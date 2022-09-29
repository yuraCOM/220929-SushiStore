
import { url } from '../Tools/consts';


class Api {

    url = url

    performRequest(url, method = 'GET', body) {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            credentials: 'include'
        }).then(response => response.json()).then(data => data)
    }


    getAll() {
        return this.performRequest(`${this.url}/db`)
    }

    //суши
    getSushiBar() {
        return this.performRequest(`${this.url}/SushiBar`)
    }

    getOneSushiBar(id) {
        return this.performRequest(`${this.url}/SushiBar/${id}`)
    }

    addSushiBar(data) {
        return this.performRequest(`${this.url}/SushiBar`, 'POST', data)
    }

    delOneSushiBar(id) {
        return this.performRequest(`${this.url}/SushiBar/${id}`, 'DELETE')
    }

    //пицца
    getAllPizza() {
        return this.performRequest(`${this.url}/Pizza`)
    }
    getOnePizza(id) {
        return this.performRequest(`${this.url}/Pizza/${id}`)
    }

    addOnePizza(data) {
        return this.performRequest(`${this.url}/Pizza`, 'POST', data)
    }

    delOnePizza(id) {
        return this.performRequest(`${this.url}/Pizza/${id}`, 'DELETE')
    }

    //burgers
    getAllBurgers() {
        return this.performRequest(`${this.url}/Burgers`)
    }

    addOneBurger(data) {
        return this.performRequest(`${this.url}/Burgers`, 'POST', data)
    }

    delOneBurger(id) {
        return this.performRequest(`${this.url}/Burgers/${id}`, 'DELETE')
    }




}

export default new Api()