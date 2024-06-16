import { Request, Response } from "express";
import { Transaccion } from "../models/transaccion";
import { Usuario } from "../models/usuario";

const getUserId = async (email:String) =>{
    try {
        // Busca si el usuario ya existe en la base de datos
        const encontrarUsuario: any = await Usuario.findOne({
             where: { email: email} 
            });
        // Si el usuario ya existe, devuelve el id
        if(encontrarUsuario)
            return encontrarUsuario.id;

    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        return null;
    }
};
export const getTransactions = async (req: Request, res: Response) => {
    //Encuentra el id del user en sesion
    const { email } = req.user;
    const UserId = await getUserId(email);
    try {
        //Encuentra todas las transacciones
      const transacciones = await Transaccion.findAll({
        where:{
            usuario_id:UserId
        }
      });
      res.json(transacciones);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
};
export const createTransaction = async (req: Request, res: Response) => {
    try {
        ///Verificar el body de la peticion
        // res.status(201).json(req.body);
        // console.log(req.user);
        //Encuentra el id del user 
        const { email } = req.user;
        const UserId = await getUserId(email);
        //console.log(UserId);
        //Si no encuentra el usuario, manda un error
        if(!UserId)
            return res.status(500).json({ error: 'Internal Server Error, cannot find user' });

        const { balance_fecha, id_cuenta_debe, id_cuenta_haber, cantidad } =
            req.body;
            //console.log(UserId,balance_fecha, id_cuenta_debe, id_cuenta_haber, cantidad  );
        // // Crea un nuevo transaccion en la base de datos
        const newTransaction = await Transaccion.create({
            usuario_id: UserId,
            balance_fecha,
            id_cuenta_debe,
            id_cuenta_haber,
            cantidad
        });

        // res.status(200);
        //     // Retorna la nueva tarea creada 
           res.status(201).json(newTransaction);

            
    } catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    res
        .status(500)
        .json({ message: "Error al crear la tarea", error: error.message });
    }
};
export const getTransaction = async (req: Request, res: Response) => {
    const{id}= req.params; 
    try {
        // Busca si la transaccion existe en la base de datos
        const transaccion = await Transaccion.findByPk(id)
        // Si la transaccion existe, devuelve la transaccion
        if (transaccion) {
            res.json(transaccion);
        } else {
            // Si no se encuentra la Transaccion, devuelve un mensaje de error
            res.status(404).json({ message: 'Transaccion no encontrada' });
        }
    } catch (error: any) {
        
    }
};
export const updateTransaction = async (req: Request, res: Response) => {
    const {id}= req.params;
    const newData = req.body;

    try {
        // Busca la trasaccion por su ID en la base de datos
        const transaccion = await Transaccion.findByPk(id);
        // Si la transaccion no se encuentra, devuelve un mensaje de error
        if (!transaccion) {
            res.status(404).json({ message: 'transaccion no encontrada' });
            return;
        }
        // Actualiza el transaccion con los nuevos datos
        await transaccion.update(newData);
        // Retorna el transaccion modificado
        res.json(transaccion);
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        res.status(500).json({ message: 'Error al modificar la transaccion', error: error.message });
    }
};
export const deleteTransaction = async (req: Request, res: Response) => {
    const{id}= req.params;
    try {
        // Busca la transaccion por su ID en la base de datos
        const transaccion = await Transaccion.findByPk(id);
        // Si la transaccion no se encuentra, devuelve un mensaje de error
        if (!transaccion) {
            res.status(404).json({ message: 'Transaccion no encontrada' });
            return;
        }
        // Elimina la transaccion de la base de datos
        await transaccion.destroy();
        // Retorna un mensaje indicando que la transaccion ha sido eliminado
        res.json({ message: 'Transaccion eliminada correctamente' });
    } catch (error: any) {
        // Si hay un error, devuelve un mensaje de error
        res.status(500).json({ message: 'Error al eliminar la transaccion', error: error.message });
    }
};
