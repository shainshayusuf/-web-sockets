<template>
    <div>
        <p>Total number of Users:{{arrayLength}}</p>
        <table >
            <thead>
				<tr>
					<th> User</th>
				</tr>
			</thead>
            <tr v-for="(email,eIndex) in emails" :key="eIndex" >
                <td>{{email}}</td>

            </tr>
        </table>
        
    </div>
</template>



<script>
export default {
    
     data(){
      return {
          emails:[],
          arrayLength:null
      }
  },
    methods:{
 onSuccess(response) {
    var array = response;
  //  var arraytobe = response;
  this.arrayLength = Object.keys(array).length 
   
    this.emails = Object.values(array).map(e=>e.email);
    console.log(this.emails)
   

}
    },
     async created(){
        await this.$axios.$get('/api/guest').then((response)=>{
            this.onSuccess(response)
            
        })
    },
    mounted() {
    this.socket = this.$nuxtSocket({
      name: 'main',
    
    })
  }
}
</script>

<style  scoped>
table, th, td {
  border: 1px solid black;
}
</style>