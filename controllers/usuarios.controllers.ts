import { Request, Response } from "express";

export const getUsuarios = (req:Request, resp: Response) =>{
    const{id}= req.params;
    resp.json({
        message:'getUsuarios',
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