<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <p v-if="error" class="red-text">{{error}}</p>
      <p v-if="success" class="green-text">{{success}}</p>
      

      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
           
      </form>
    </div>
  </div>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AdminAuthPage',
  
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      isLogin: true,
      email:'',
      password:'',
      error:null,
      success:null,
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch('authenticateUser',{
        isLogin:this.isLogin,
        email:this.email,
        password:this.password
      }).then((response)=>{
        if(response.message === "Auth successful"){
          this.$store.state.authenticated=true
          window.localStorage.setItem("email",this.email);
          this.$router.push('/Home');
          
        }
        else if(response.message ==="Sign up successful"){
          this.success='Login to continue'
        }
        else{
          this.error=response.message;
        }
        
      })
    },

  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
.red-text{
  color: red;
  -webkit-animation: cssAnimation 5s forwards; 
    animation: cssAnimation 5s forwards;
  
}
.green-text{
  color: green;
  -webkit-animation: cssAnimation 5s forwards; 
    animation: cssAnimation 5s forwards;
  
}
@keyframes cssAnimation {
    0%   {opacity: 1;}
    90%  {opacity: 1;}
    100% {opacity: 0;}
}
@-webkit-keyframes cssAnimation {
    0%   {opacity: 1;}
    90%  {opacity: 1;}
    100% {opacity: 0;}
}
</style>

