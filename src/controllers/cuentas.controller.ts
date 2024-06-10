import { Request, Response } from "express";
import { Cuenta } from "../models/cuenta";

export const getAccounts = async(req:Request, res: Response) => {
    const cuentas = await Cuenta.findAll();
    res.json(cuentas);
};
export const createAccount = async(req:Request, res: Response) => {};
export const getAccount = async(req:Request, res: Response) => {}; 
export const updateAccount = async(req:Request, res: Response) => {};
export const deleteAccount = async(req:Request, res: Response) => {};