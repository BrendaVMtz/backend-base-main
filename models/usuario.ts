import { DataTypes } from "sequelize";
import db from "../database/connect";

export const Usuario = db.define('usuario', {
    
    nombre:{
        type: DataTypes.STRING 
    },
    email:{
        type: DataTypes.STRING 
    },
    estado:{
        type: DataTypes.BOOLEAN
    },

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
 
(async () => {
    await Usuario.sync();
    console.log("Modelo Usuario sincronizado con la base de datos");
})();;

