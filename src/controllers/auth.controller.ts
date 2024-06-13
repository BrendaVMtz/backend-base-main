import { profile } from "console";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import {Usuario} from "../models/usuario";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config";
import { createAccessToken } from "../libs/jws";

// import { NotFound } from "http-errors";
// import { LoginSchemaType, SignupSchemaType } from "../schemas/user.schema";

export const signupHandler = async(
  req: Request, res: Response
) => {
  ///Extraer el email y contrasena
  const { email, contrasena } = req.body;
  const usuario = req.body;
    try {
      // Busca si el usuario ya existe en la base de datos
      const encontrarUsuario = await Usuario.findOne({
           where: { email: email } 
      });
      
      // Si el usuario ya existe, devuelve un error
      if (encontrarUsuario) {
          res.status(400).json({ message: 'El email ya esta en uso' });
          return;
      }
      // hashing the password
      const passwordHash = await bcrypt.hash(contrasena, 10);
      console.log(passwordHash);
      
      // Crea un nuevo usuario en la base de datos
      const newUser: any = await Usuario.create({
        nombre: usuario.nombre,
        email: usuario.email,
        contrasena: passwordHash,
        estado: usuario.estado
      });
      
      //Creacion del token
      const token = await createAccessToken({
        email
      });

      res.cookie("token", token);
      // Retorna el nuevo usuario creado
      res.status(201).json({
        nombre: newUser.nombre,
        email: newUser.email,
      });


    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

export const loginHandler = async (
  req: Request,
  res: Response
) => {
  const { email, contrasena } = req.body;
  const usuario = req.body;
  console.log(usuario);
  try {
  // Busca si el usuario ya existe en la base de datos
  const encontrarUsuario: any = await Usuario.findOne({
    where: { email: email } 
  });
  
  if (!encontrarUsuario) {
    res.status(400).json({ message: 'Email o contrasena incorrecta' });
    return;
  }

  // Valida si la contrasena es correcta
  const isMatch = await bcrypt.compare(contrasena, encontrarUsuario.contrasena);
  if (!isMatch) {
    return res.status(400).json({
      message: ["Email o contrasena incorrecta"],
    });
  }


  //Creacion del token
  const token = await createAccessToken({
    email
  });

  res.cookie("token", token);
  // Retorna el nuevo usuario creado
  res.status(200).json({
    nombre: encontrarUsuario.nombre,
    email: encontrarUsuario.email,
  });


} catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profileHandler = async (req: Request, res: Response) => {
  // Busca si el usuario ya existe en la base de datos

  //console.log(req.user);
  const { email, contrasena } = req.user;
  const encontrarUsuario: any = await Usuario.findOne({
      where: { email: req.user.email } 
    }); 
    
    if (!encontrarUsuario) {
    res.status(400).json({ message: 'Usuario no encontrado' });
    return;
  }

  //console.log('ayuda');

   return res.status(200).json({
      nombre: encontrarUsuario.nombre,
    email: encontrarUsuario.email,
  });
};
