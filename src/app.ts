import express from "express";
import cors from "cors";
import usersRouter from "./routes/usuarios.routes";
import authRoutes from './routes/auth.routes'
import transactionRoutes from './routes/transacciones.routes'
import accountRoutes from './routes/account.routes' 
import dbConnection from "./database/connect";
import morgan from "morgan";
import { PORT } from "./config";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan('dev'));

app.use(express.json());  // la comunicacion entre servidor y cliente es con JSON
app.use(cookieParser()); //extraer cookies de la peticion
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); // las referencias cruzadas


//const PORT = 3000;

(async () => {
    try {
        await dbConnection.authenticate(); // conexion a la Base de datos
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    
    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/transactions", transactionRoutes);
    app.use("/api/accounts", accountRoutes);
    app.use('/api/test', usersRouter); // el enrutamiento que van a tener tus peticiones

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})();