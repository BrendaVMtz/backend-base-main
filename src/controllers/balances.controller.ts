import { Request, Response } from "express";
import { Balance } from "../models/balance";
import { Usuario } from "../models/usuario";
import { Transaccion } from "../models/transaccion";

const getUserId = async (email: String) => {
  try {
    // Busca si el usuario ya existe en la base de datos
    const encontrarUsuario: any = await Usuario.findOne({
      where: { email: email },
    });
    // Si el usuario ya existe, devuelve el id
    if (encontrarUsuario) return encontrarUsuario.id;
  } catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    return null;
  }
};

//////////CREATE
export const createBalance = async (req: Request, res: Response) => {
  // console.log(req.user);
  try {
    // console.log(email);
    // console.log(UserId);
    const { email } = req.user;
    const UserId = await getUserId(email);
    //Si no encuentra el usuario, manda un error
    // console.log(req.body)
    // console.log(req);
    if (!UserId)
      return res
        .status(500)
        .json({ error: "Internal Server Error, cannot find user" });
    const { anio, mes } = req.body;
    //console.log(UserId,balance_fecha, id_cuenta_debe, id_cuenta_haber, cantidad  );
    // Crea un nuevo Balance en la base de datos
    const newBalance = await Balance.create({
      usuario_id: UserId,
      anio,
      mes,
    });
    return res.status(201).json(newBalance);
  } catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    return res.status(500).json({
      message: "Error al crear el nuevo balance",
      error: error.message,
    });
  }
};

///READ
export const getBalances = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const { email } = req.user;
    const UserId = await getUserId(email);
    if (!UserId)
      return res
        .status(500)
        .json({ error: "Internal Server Error, cannot find user" });

    const balances = await Balance.findAll({
      where: { usuario_id: UserId },
    });

    return res.status(200).json(balances);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error al obtener los balances", error: error.message });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  // console.log(req.user)
  try {
    const { email } = req.user;
    const { id } = req.params;
    const UserId = await getUserId(email);
    if (!UserId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    const balances = await Balance.findOne({
      where: { usuario_id: UserId, id: id },
    });
    res.status(200).json(balances);
    return;
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error al obtener el balance", error: error.message });
  }
};

////Leer lista de transacciones por balance
export const getTransactionsByBalance = async (req: Request, res: Response) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const UserId = await getUserId(email);
    if (!UserId)
      return res.status(403).json({ error: "Usuario no autorizado" });
    const balance = await Balance.findOne({
      where: { usuario_id: UserId, id: id },
    });

    const balance_id = balance?.dataValues.id;
    const transacciones = await Transaccion.findAll({
      where: {
        balance_id: balance_id,
      },
    });

    return res.status(200).json(transacciones);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al obtener las transacciones",
      error: error.message,
    });
  }
};

export const deleteBalance = async (req: Request, res: Response) => {
  console.log(req.user);
  const { email } = req.user;
  const { id } = req.params;

  try {
    //Verificar
    const UserId = await getUserId(email);
    if (!UserId)
      return res
        .status(500)
        .json({ error: "Internal Server Error, cannot find user" });

    // Busca el balance por su ID en la base de datos
    const balance = await Balance.findByPk(id);
    // Si el balance no se encuentra, devuelve un mensaje de error
    if (!balance) {
      res.status(404).json({ message: "balance no encontrado" });
      return;
    }
    // Elimina el balance de la base de datos
    await balance.destroy();
    // Retorna un mensaje indicando que el balance ha sido eliminado
    res.json({ message: "balance eliminado correctamente" });
  } catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    res
      .status(500)
      .json({
        message: "Error al eliminar el balance",
        error: error.message,
      });
  }
};
