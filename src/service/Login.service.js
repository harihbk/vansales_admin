import axios from 'axios';



export default {
    Authentication(credentials) { 
       return axios.post(`${process.env.REACT_APP_BASE_URL}/authentication`,credentials).then(r=>{
            return r;
        })
     }, 
    bar() { console.log('bar') },
    baz() { this.foo(); this.bar() }
}