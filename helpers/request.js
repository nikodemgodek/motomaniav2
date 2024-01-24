import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.1.40:8000',
})

export default request;