import mongoose from 'mongoose';


const dbConnection = async () => {
  try{

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexion a la base de datos establecida');

  }catch(err){
    console.log('Error al conectar a la base de datos', err);
    throw new Error(err);
  }
}

export default dbConnection;
