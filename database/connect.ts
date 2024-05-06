import { Sequelize } from "sequelize"; 

const db = new Sequelize('miracleworks', 'root', 'awadefresa', {
    
    host: "localhost",
    port:  3306,
    database: "miracleworks",
    username: "root",
    password: "awadefresa",
    dialect: "mysql"
});

export default db;



/* var mysql = require('mysql');

var conexion = mysql.createConnection({
    
    host: "localhost",
    database: "proyecto",
    username: "root",
    password: "s4r4i2024#"

}); */