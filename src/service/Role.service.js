import axios from 'axios';



export default {
    GetRoles() { 
       return axios.get(`${process.env.REACT_APP_BASE_URL}/role`).then(r=>{
            return r;
        })
     }, 
   
}