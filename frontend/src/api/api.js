import axios from 'axios';

const getConfig = payload => {
    if (payload.body) return {'Content-Type': 'application'};
}

const api = {
    get(url) {
        return axios.get(url);
    },
    post(url, payload) {
        return axios.post(url, payload);
    }
}

export default api;