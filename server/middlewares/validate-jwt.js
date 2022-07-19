import {request, response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';

const validateJWT = async(req = request, res = response) => { 
  
  const token = req.headers('x-token');

  // Verificar si el token existe
  if(!token){
    return res.status(401).json({msg: 'No existe el token en la petición'});
  }

  try{
    const {uid} = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    if(!uid){
      return res.status(401).json({msg: 'El token no es válido'});
    }

    // Verificar si el usuario existe
    const user = await User.findById(uid);

    if(!user){
      return res.status(401).json({msg: 'El usuario no existe'});
    }


    // Verificar si el usuario está activo
    if(!user.state){
      return res.status(401).json({msg: 'El usuario no está activo'});
    }

    req.user = user;
    next();
  }catch(err){
    console.log('Error al validar el JWT', err);
    res.status(500).json({msg: 'Error al validar el JWT'});
  }

}

export default validateJWT;