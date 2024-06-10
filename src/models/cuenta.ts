import { DataTypes } from "sequelize";
import db from '../database/connect';

export const Cuenta = db.define('cuenta',{

    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('Activo', 'Pasivo', 'Capital'),
        allowNull: false
    },
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false,

});

// Sincronizar con la base de datos
(async () => {
    await Cuenta.sync();
    console.log("Modelo Cuenta sincronizado con la base de datos");
  })();