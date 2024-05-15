import { Request, Response } from "express";
//import { profile } from "console";
import jwt from 'jsonwebtoken';
import { Usuario } from "../models/usuario";

//import { signupValidation, signinValidation } from '../libs/joi'


export const login = async (req: Request, res: Response) => {
    
    //Crear token
    const token: string = jwt.sign({user: Usuario }, 'miTokenSecreto', {
        expiresIn: 60 * 60 * 24  //expira en 24 horas
    });
    //res.header('auth-token', token).json(token);
    
    return res.json({
        token
    });
};

export const profile = async (req: Request, res: Response) => {
    const{id}= req.params;

    const user = await Usuario.findByPk(id);
    if (!user) {
        return res.status(404).json('No User found');
    } 
    res.json(user);

    return res.json({
        profile:  req.params,
        message:"profile"
    });
};


