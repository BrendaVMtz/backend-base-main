import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async(req:Request, resp: Response) =>{
    const usuarios = await Usuario.findAll();
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