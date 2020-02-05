import axios from 'axios';

const API_URL = 'https://api.elements.borger.io/';

export default class Api {

    constructor() {
    }

    getCategories() {
        return axios.get(`${API_URL}categories`)
            .then(res => res.data);
    }

    getElements() {
        return axios.get(`${API_URL}elements`)
            .then(res => res.data);
    }

    getElement(tagName) {
        return axios.get(`${API_URL}elements/${tagName}`)
            .then(res => res.data);
    }
}