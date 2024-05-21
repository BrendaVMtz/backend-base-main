
import { Request, Response, NextFunction} from "express";
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

//Acceder a la ruta login para iniciar en la aplicacion
app.post("/api/login", (req:Request, res: Response) => {
    
    const user = {
        id: 1,
        nombre: 'Emily',
        email: 'emily@gmail.com'
    } 

    //TOKEN - identificar usuario que se encuentra logueado
    //expiresIn es el tiempo en que expira el token, en este caso 1 hora
    jwt.sign({user}, 'secretkey', { expiresIn: '1h'}, (err: any, token: any) => {
    
        res.json({  
            token
        }); 
    });
}); 

//Devuelve la informacion del usuario
app.post("/api/posts", verifyToken, (req, res) => {

    const token = req.body
    //req.token - token
    jwt.verify(token, 'secretkey', (error: any, authData: any) => {
        if (error) {
            res.status(403).json({  
                message: 'No hay acceso'
            });       //403 ruta o acceso prohibido
        }else{
            res.json({  
                message:`Post fue creado`,
                authData: authData
            }); 
        }        
    });
}); 

//Authorization: Bearer <token>
//Verificar que realmente el usuario este enviando un token 
function verifyToken(req: Request, res: Response, next: NextFunction) {
    
    const bearerHeader = req.headers['authorization'];

    //verificar que el token existe 
    if(typeof bearerHeader !== 'undefined'){
        //dividir siempre y cuando exista un espacio
        const bearerToken = bearerHeader.split(" ")[1] //1 para tener acceso al token
        //req.token = bearerToken; 
        next();
    }else{
        res.status(403).json({  
            message: 'No hay acceso'
        });       //403 ruta o acceso prohibido
    }  
}

//routes
//app.use('/api', authRouter); 

//port
app.listen(3000, function(){
    console.log(`nodejs app runnning... `);
});

