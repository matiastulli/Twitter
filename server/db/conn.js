const mongoose = require('mongoose');
mongoose.set('bufferCommands',false);
const connectToServer = async() =>{
    try{

        await mongoose.connect(process.env.ATLAS_URI);

        console.log('Bases de datos online');
    }catch (error){
        console.log(error);
        throw new Error('Error base de datos');
    }
}

module.exports = {
  connectToServer
}