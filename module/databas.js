
const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({ 
    inputfirstName: {
        type: String,
      },
      inputlastName: {
        type: String,
       
      },
   
      inputtele:{
        type: String,
       
      },
      inputage:{
        type: String,
       
      },
     
      inputCountry: {
        type: String,
       
      },
      inputGender: {
        type: String,
     
      }
} ,{timestamps:true}) 
  

module.exports = mongoose.model('User', userSchema);