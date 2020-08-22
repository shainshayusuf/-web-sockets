import Vuex from 'vuex'

const createStore =() => {
    return new Vuex.Store({
        state:{
            authenticated:null
        },
        mutations:{
            
        },
        actions:{
           authenticateUser(veuxContext,authData){
            let authUrl='/api/login';
            
            if(!authData.isLogin){
               authUrl='/api/signup'
               
            }
              return this.$axios.$post(authUrl,{
               
               email:authData.email,
               password:authData.password,
               }).then(result =>{
                 return result;
                 
               })
           }
        },
        getters:{
            
        }
    })
}

export default createStore