import { Sequelize } from "sequelize"; 

const db = new Sequelize('proyecto', 'root', 's4r4i2024#', {
    
    host: "localhost",
    port:  3306,
    // database: "proyecto",
    // username: "root",
    // password: "s4r4i2024#",
    dialect: "mysql"
});

export default db;
