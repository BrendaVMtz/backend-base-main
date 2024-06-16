import { Request, Response } from "express";
import { Cuentas } from "../models/cuenta";

export const getAccounts = async(req:Request, res: Response) => {
    try {
        const cuentas = await Cuentas.findAll();
        res.json(cuentas);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
export const getAccount = async(req:Request, res: Response) => {
    try {
        const cuenta = await Cuentas.findByPk(req.params.id);
        if(!cuenta) return res.status(404).json({ message: "Account not found" });
        res.json(cuenta);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
// export const createAccount = async(req:Request, res: Response) => {};
// export const getAccount = async(req:Request, res: Response) => {}; 
// export const updateAccount = async(req:Request, res: Response) => {};
// export const deleteAccount = async(req:Request, res: Response) => {};