import { Request, Response, response } from "express";
import { Transaccion } from "../models/transaccion";
import { Usuario } from "../models/usuario";
import { Balance } from "../models/balance";

const validateId = async (email: String, balance_id: string) => {
  try {
    const encontrarUsuario: any = await Usuario.findOne({
      where: { email: email },
    });
    if (encontrarUsuario) {
      console.log(balance_id);
      const balance = await Balance.findOne({
        where: { usuario_id: encontrarUsuario.id, id: balance_id },
      });
      console.log(balance);
      return balance ? balance.dataValues.id : null;
    }
  } catch (error: any) {
    return null;
  }
};

//CREATE
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { email } = req.user;
    const { balance_id, id_cuenta_debe, id_cuenta_haber, cantidad } = req.body;
    const balanceId = await validateId(email, balance_id);
    if (!balanceId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    ////////////////////////////
    //Crear una nueva transaccion
    const newTransaction = await Transaccion.create({
      balance_id: balance_id,
      id_cuenta_debe: id_cuenta_debe,
      id_cuenta_haber: id_cuenta_haber,
      cantidad: cantidad,
    });
    return res.status(201).json(newTransaction);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al crear el nuevo balance",
      error: error.message,
    });
  }
};

//READ
export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const { balance_id } = req.body;
    const balanceId = await validateId(email, balance_id);
    if (!balanceId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    ////////////////////////////
    //Leer una transaccion
    const newTransaction = await Transaccion.findOne({
      where: { balance_id: id },
    });
    return res.status(201).json(newTransaction);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al leer la transaccion",
      error: error.message,
    });
  }
};
///UPDATE
export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { balance_id } = req.body;
  const newTransaction = req.body;
  const { email } = req.user;

  try {
    //Validar
    const balanceId = await validateId(email, balance_id);
    if (!balanceId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    ////////////////////////////
    //Modificar
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) {
        res.status(404).json({ message: 'Tarea no encontrada' });
        return;
    }
    await transaccion.update(newTransaction);
    ///Respuesta
    return res.status(200).json(transaccion);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al leer la transaccion",
      error: error.message,
    });
  }
};

////DELETE
export const deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
  const { balance_id } = req.body;
  const newTransaction = req.body;
  const { email } = req.user;

  try {
    //Validar
    const balanceId = await validateId(email, balance_id);
    if (!balanceId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    ////////////////////////////
    //Borrar
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) {
        res.status(404).json({ message: 'Usuario no tarea' });
        return;
    }
    transaccion.destroy();
    ///Respuesta
    res.json({ message: 'Transaccion eliminado correctamente' });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al leer la transaccion",
      error: error.message,
    });
  }
}

