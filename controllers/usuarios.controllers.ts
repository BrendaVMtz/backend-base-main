import { Request, Response } from "express";
import {Usuario} from "../models/usuario";

//Crear usuario
export const postUsuario =  async(req:Request, resp: Response) =>{
    const{body} = req;

    try {
        //Busca si existe el email en la base de datos 
        const existeEmail = await Usuario.findOne({
            where:{ email: body.email }
        });

        //Si el email ya existe, devuelve un error
        if(existeEmail) {
            //409 conflict
            return resp.status(409).json({
                message:'Ya existe un usuario con el email ' + body.email
            });
        } 

        //Crea un nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create(body);
        
        // Retorna el nuevo usuario creado
        resp.status(201).json(nuevoUsuario);
       
        resp.status(200).json({  
            message: 'El registro se agrego correctamente'
        });      

    } catch (error) {
        //Si hay un error, devuelve el mensaje de error
        //500 Internal Server Error 
        resp.status(500).json({  
            message: 'Error al crear el usuario'
        });
    }
}

//Obtener todos los usuarios
export const getUsuarios = async(req:Request, resp: Response) =>{
    
    const usuarios = await Usuario.findAll();
    resp.json(usuarios); 
}

//Obtener un usuario
export const getUsuario = async(req:Request, resp: Response) =>{

    const{id}= req.params;
    
    //Busca si existe al usuario a traves del ID 
    const usuario = await Usuario.findByPk(id);
    //Si ek usuario existe, devuelve el usuario
    if(usuario) {
        resp.json(usuario); 
    }else {
        //Si no encuentra al usuario, devuelve un mensaje 
        //404 Not found
        resp.status(404).json({
            message:`No existe el usuario con el id ${id}` 
        }); 
    }    
}

//Actualizar usuario
export const putUsuario = async(req:Request, resp: Response) =>{
    
    const{id}= req.params;
    const{body}= req;
    
    try {
        // Busca el usuario por su ID en la base de datos
        const usuario = await Usuario.findByPk(id);
        // Si el usuario no se encuentra, devuelve un mensaje de error
        if (!usuario) {
            return resp.status(404).json({ 
                message: `No existe el usuario con el id ${id}` 
            });
        }
        // Actualiza el usuario con los nuevos datos
        await usuario.update(body);
        // Retorna el usuario modificado
        resp.json(usuario);

    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ 
            message: 'Error al modificar el usuario' 
        });
    }
}

export const deleteUsuario = async(req:Request, resp: Response) =>{

    const{id} = req.params;
    
    try {
        // Busca el usuario por su ID en la base de datos
        const usuario = await Usuario.findByPk(id);
        // Si el usuario no se encuentra, devuelve un mensaje de error
        if (!usuario) {
            return resp.status(404).json({ 
                message: `No existe el usuario con el id ${id}` 
            });
        }
        //Eliimina al usuario de la base de datos 
        await usuario.destroy();
        //Mensaje de que se elimino el usuario
        resp.json({ 
            message: `Usuario eliminado correctamente` 
        });

    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ 
            message: 'Error al eliminar el usuario' 
        });
    }
}



//OBTENER TODOS LOS USUARIOS
/* export const getUsuarios = (req:Request, resp: Response) =>{
    
    resp.json({
        message:'getUsuarios'
    })
} */

//OBTENER UN USUARIO
/* export const getUsuario = (req:Request, resp: Response) =>{
    
    const{id}= req.params;

    resp.json({
        message:'getUsuario',
        id
    })
} */

//CREAR UN USUARIO
/* export const postUsuario = (req:Request, resp: Response) =>{
    
    const{body}= req;

    resp.json({
        message:'postUsuario',
        body
    })
} */

//ACTUALIZAR UN USUARIO
/* export const putUsuario = (req:Request, resp: Response) =>{
    
    const{id}= req.params;
    const{body}= req;
    
    resp.json({
        message:'putUsuario',
        body,
        id
    })
} */

//ELIMINAR UN USUARIO
/* export const deleteUsuario = (req:Request, resp: Response) =>{
    
    const{id}= req.params;
    
    resp.json({
        message:'deleteUsuario',
        id
    })
} */