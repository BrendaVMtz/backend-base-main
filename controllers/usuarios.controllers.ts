import { Request, Response, NextFunction} from "express";
//import jwt from 'jsonwebtoken';
import {Usuario} from "../models/usuario";


//Crear usuario
export const postUsuario =  async(req:Request, resp: Response) =>{
    const usuario = req.body;

    try {
        //Busca si existe el email en la base de datos 
        const existeEmail = await Usuario.findOne({
            where:{ email: usuario.email }
        });

        //Si el email ya existe, devuelve un error
        if(existeEmail) {
            //409 conflict
            return resp.status(409).json({
                message:'Ya existe un usuario con el email ' + usuario.email
            });
        } 

        //Crea un nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create(usuario);
        /* 
        const nuevoUsuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            estado: req.body.estado
        } 
        
        const nuevoUsuario = {
            id: 10,
            nombre: 'Elizabeth',
            email: 'elizabeth.ruiz@gmail.com',
            estado: 1
        }*/
        
        // Retorna el nuevo usuario creado
        resp.status(201).json(nuevoUsuario);
       
        resp.status(200).json({  
            message: 'El registro se agrego correctamente'
        });  

        //Crear TOKEN
        /* jwt.sign({nuevoUsuario}, 'secretkey', { expiresIn: '1h'}, (err: any, token: any) => {
    
            resp.json({  
                token
            }); 
        }); */

    } catch (error: any) {
        //Si hay un error, devuelve el mensaje de error
        //500 Internal Server Error 
        resp.status(500).json({  
            message: 'Error al crear el usuario', error: error.message
        });
    }
}

//Devuelve la informacion del usuario
/* export const postsUsuario = (req:Request, resp: Response) => {
    
    jwt.verify(req.token, 'secretkey', (error: any, authData: any) => {
        if (error) {
            resp.status(403).json({  
                message: 'No hay acceso'
            });       //403 ruta o acceso prohibido
        }else{
            resp.json({  
                message:`Post fue creado`,
                authData: authData
            }); 
        }        
    });
} 

//Authorization: Bearer <token>
//Verificar que realmente el usuario este enviando un token 
function verifyToken(req: Request, resp: Response, next: NextFunction) {
    
    const bearerHeader = req.headers['authorization'];

    //verificar que el token existe 
    if(typeof bearerHeader !== 'undefined'){
        //dividir siempre y cuando exista un espacio
        const bearerToken = bearerHeader.split(" ")[1] //1 para tener acceso al token
        req.token = bearerToken; 
        next();
    }else{
        resp.status(403).json({  
            message: 'No hay acceso'
        });       //403 ruta o acceso prohibido
    }  
}*/

//Obtener todos los usuarios
export const getUsuarios = async(req:Request, resp: Response) =>{
    
    const usuarios = await Usuario.findAll();
    resp.json(usuarios); 
}

//Obtener un usuario
export const getUsuario = async(req:Request, resp: Response) =>{

    const{id}= req.params;
    try{  
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
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        resp.status(500).json({ 
            message: 'Error al leer usuarios' 
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
            message: 'Error al modificar el usuario', error:  error.message
        });
    }
}

//Eliminar usuario
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

