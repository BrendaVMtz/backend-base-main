import { DataTypes } from "sequelize";
import db from '../database/connect';

export const Transaccion = db.define('transaccion',{

    balance_fecha:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    id_cuenta_debe:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id_cuenta_haber:{
        type:DataTypes.STRING,
        allowNull: false
    }
    ,
    cantidad:{
        type:DataTypes.BOOLEAN,
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
});

Transaccion.beforeCreate((user: any) => {
    user.nombre = user.nombre.trim();
    user.email = user.email.trim();
  });

// Sincronizar con la base de datos
(async () => {
    await Transaccion.sync();
    console.log("Modelo Transaccion sincronizado con la base de datos");
  })();