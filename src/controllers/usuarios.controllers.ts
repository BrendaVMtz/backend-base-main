import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

///////////////CREATE///////////////
export const createUsuario = async(req:Request, resp: Response) =>{
    const usuario = req.body;
    try {
        // Busca si el usuario ya existe en la base de datos
        const encontrarUsuario = await Usuario.findOne({
             where: { email: usuario.email } 
            });
        
        // Si el usuario ya existe, devuelve un error
        if (encontrarUsuario) {
            resp.status(409).json({ message: 'El usuario ya existe' });
            return;
        }

        // Crea un nuevo usuario en la base de datos
        const newUsuario = await Usuario.create(usuario);

        // Retorna el nuevo usuario creado
        resp.status(201).json(newUsuario);
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
}



export const getUsuarios = async(req:Request, resp: Response) =>{
    const usuarios= await Usuario.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir 'createdAt' y 'updatedAt'
      });
    resp.json(usuarios);
}
export const getUsuario = (req:Request, resp: Response) =>{
    const{id}= req.params;
    resp.json({
        message:'getUsuario',
        id
    })
}
export const postUsuarios = (req:Request, resp: Response) =>{
    const{body}= req;
    resp.json({
        message:'postUsuarios',
        body
    })
}
export const putUsuario = (req:Request, resp: Response) =>{
    const{id}= req.params;
    const{body}= req;
    resp.json({
        message:'putUsuario',
        body,
        id
    })
}

export const deleteUsuario = (req:Request, resp: Response) =>{
    const{id}= req.params;
    resp.json({
        message:'deleteUsuario',
        id
    })
}