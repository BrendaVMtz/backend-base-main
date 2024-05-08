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

/////////////READ//////////////
export const getUsuarios = async(req:Request, resp: Response) =>{
    const usuarios= await Usuario.findAll();
    resp.json(usuarios);
}
export const getUsuario = async (req:Request, resp: Response) =>{
    const{id}= req.params; 
    try {
        // Busca si el usuario existe en la base de datos
        const usuario = await Usuario.findByPk(id)
        // Si el usuario existe, devuelve el usuario
        if (usuario) {
            resp.json(usuario);
        } else {
            // Si no se encuentra el usuario, devuelve un mensaje de error
            resp.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        
    }

}

//////////////UPDATE////////////////
export const modificarUsuario  = async (req:Request, resp: Response) =>{
    const {id}= req.params;
    const newData = req.body;

    try {
        // Busca el usuario por su ID en la base de datos
        const usuario = await Usuario.findByPk(id);
        // Si el usuario no se encuentra, devuelve un mensaje de error
        if (!usuario) {
            resp.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Actualiza el usuario con los nuevos datos
        await usuario.update(newData);
        // Retorna el usuario modificado
        resp.json(usuario);
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ message: 'Error al modificar el usuario', error: error.message });
    }
}
////////////////DELETE/////////////
export const borrarUsuario  = async(req:Request, resp: Response) =>{
    const{id}= req.params;
    try {
        // Busca el usuario por su ID en la base de datos
        const user = await Usuario.findByPk(id);
        // Si el usuario no se encuentra, devuelve un mensaje de error
        if (!user) {
            resp.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Elimina el usuario de la base de datos
        await user.destroy();
        // Retorna un mensaje indicando que el usuario ha sido eliminado
        resp.json({ message: 'Usuario eliminado correctamente' });
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
}