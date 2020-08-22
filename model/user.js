const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cretae a schema
const UserSchema = new Schema({
email:{
type:String,
required:true
}, 

password:{
    type:String,
    required:true
    }, 




}); 
 module.exports=mongoose.model('users',UserSchema); 