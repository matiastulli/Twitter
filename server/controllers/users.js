import { request, response } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const userPost = async (req = request, res = response) => {

  const {name, surname, email, password, birthdate} = req.body;
  const user = new User({name, surname, email, password, birthdate});

  // Verificar si el usuario existe
  const userExist = await User.findOne({email});
  if(userExist){
    return res.status(400).json({msg: 'El usuario ya existe'});
  }
  
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en la DB
  try{
    await user.save();
    res.json({
      user
    });
  }catch(err){
    console.log('Error al guardar el usuario', err);
    res.status(500).json({msg: 'Error al guardar el usuario'});
  }

}


export default userPost;