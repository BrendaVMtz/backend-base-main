import { Sequelize } from "sequelize"; 

const db = new Sequelize('proyecto', 'root', 's4r4i2024#', {
    
    host: "localhost",
    port:  3306,
    database: "",
    username: "root",
    password: "s4r4i2024#",
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