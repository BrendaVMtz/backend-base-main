import { DataTypes } from "sequelize";
import db from '../database/connect';

export const Usuario = db.define('usuario',{

    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena:{
        type:DataTypes.STRING,
        allowNull: false
    }
    ,
    estado:{
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

Usuario.beforeCreate((user: any) => {
    user.nombre = user.nombre.trim();
    user.email = user.email.trim();
  });

// Sincronizar con la base de datos
(async () => {
    await Usuario.sync();
    console.log("Modelo Usuario sincronizado con la base de datos");
  })();
