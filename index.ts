
import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import jwt from 'jsonwebtoken';
///import authRouter from "./routes/auth.routes";

const app = express();
//middlewares
app.use(express.json())  // la comunicacion entre servidor y cliente es con JSON
app.use(cors()) // las referencias cruzadas

const PORT = 3000;

app.get("/api", (req:Request, res: Response) => {
    res.json({
        message: 'Nodejs and JWT' 
    }); 
}); 

app.post("/api/login", (req:Request, res: Response) => {
    
    const user = {
        id: 1,
        nombre: 'Emily',
        email: 'emily@gmail.com'
    }

    //TOKEN
    jwt.sign({user}, 'secretkey', (err: any, token: any) => {
    
        res.json({  
            token
        }); 
    });

}); 

//routes
//app.use('/api', authRouter); 

//port
app.listen(3000, function(){
    console.log(`nodejs app runnning... `);
});

