import { DataTypes } from "sequelize";
import db from '../database/connect';
import {Usuario} from './usuario';

export const Balance = db.define('balance',{

    usuario_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario // Referencia al modelo User
        }
    },
    anio:{
        type:DataTypes.INTEGER,
        allowNull: false 
    },
    mes:{
        type:DataTypes.INTEGER,
        allowNull: false 
    }
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false,

});

// Sincronizar con la base de datos
(async () => {
    await Balance.sync();
    console.log("Modelo Balance sincronizado con la base de datos");
  })();