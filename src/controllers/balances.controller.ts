import { Request, Response } from "express";
import { Balance } from "../models/balance";
import { Usuario } from "../models/usuario";

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
    res.status(201).json(newBalance);
  } catch (error: any) {
    // Si hay un error, devuelve un mensaje de error
    res.status(500).json({
      message: "Error al crear el nuevo balance",
      error: error.message,
    });
  }
};

///READ
export const getBalances = async (req: Request, res: Response) => {
  // console.log(req.user);
  try {
    const {email} = req.user;
    const UserId = await getUserId(email);
    if (!UserId)
        return res
          .status(500)
          .json({ error: "Internal Server Error, cannot find user" });

    const balances = await Balance.findAll({
        where: {usuario_id: UserId}
    });
    res.status(200).json(balances);

  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error al obtener los balances", error: error.message });
  }
};

// export const getBalance = async (req: Request, res: Response) => {
//     const{id}= req.params;
//     try {
//         // Busca si la transaccion existe en la base de datos
//         const transaccion = await Transaccion.findByPk(id)
//         // Si la transaccion existe, devuelve la transaccion
//         if (transaccion) {
//             res.json(transaccion);
//         } else {
//             // Si no se encuentra la Transaccion, devuelve un mensaje de error
//             res.status(404).json({ message: 'Transaccion no encontrada' });
//         }
//     } catch (error: any) {

//     }
// };
// export const updateBalance = async (req: Request, res: Response) => {
//     const {id}= req.params;
//     const newData = req.body;

//     try {
//         // Busca la trasaccion por su ID en la base de datos
//         const transaccion = await Transaccion.findByPk(id);
//         // Si la transaccion no se encuentra, devuelve un mensaje de error
//         if (!transaccion) {
//             res.status(404).json({ message: 'transaccion no encontrada' });
//             return;
//         }
//         // Actualiza el transaccion con los nuevos datos
//         await transaccion.update(newData);
//         // Retorna el transaccion modificado
//         res.json(transaccion);
//     } catch (error: any) {
//         // Si hay un error, devuelve un mensaje de error
//         res.status(500).json({ message: 'Error al modificar la transaccion', error: error.message });
//     }
// };
// export const deleteBalance = async (req: Request, res: Response) => {
//     const{id}= req.params;
//     try {
//         // Busca la transaccion por su ID en la base de datos
//         const transaccion = await Transaccion.findByPk(id);
//         // Si la transaccion no se encuentra, devuelve un mensaje de error
//         if (!transaccion) {
//             res.status(404).json({ message: 'Transaccion no encontrada' });
//             return;
//         }
//         // Elimina la transaccion de la base de datos
//         await transaccion.destroy();
//         // Retorna un mensaje indicando que la transaccion ha sido eliminado
//         res.json({ message: 'Transaccion eliminada correctamente' });
//     } catch (error: any) {
//         // Si hay un error, devuelve un mensaje de error
//         res.status(500).json({ message: 'Error al eliminar la transaccion', error: error.message });
//     }
// };
