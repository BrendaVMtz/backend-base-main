import { DataTypes } from "sequelize";
import db from '../database/connect';
import {Usuario} from './usuario';

export const Transaccion = db.define('transacciones',{

    usuario_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario // Referencia al modelo User
        }
    },
    balance_fecha: {
        type:DataTypes.DATEONLY,
        allowNull: false
    },
    id_cuenta_debe:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    id_cuenta_haber:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
    ,
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull: false 
    }
},
{
    // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,

  // your other configuration here
}
);

Transaccion.belongsTo(Usuario, {foreignKey:'usuario_id'});



// Sincronizar con la base de datos
(async () => {
    await Transaccion.sync();
    console.log("Modelo Transaccion sincronizado con la base de datos");
  })();