import api from './api';

export default authAPI = {
    async login (username, password) {
        try{
            const res = await api.post('/api/auth/login', {body: {username, password}});
        }catch(err){
            throw err.response.data;
        }
    }
}