import  express, {Application} from "express";
import userRoutes from '../routes/usuarios.routers';
import cors from 'cors';

export class Server {
    private app: Application;
    private port: string;
    private apiRoutes = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }

    middlewares(){
        /// Cross Domain
        this.app.use(cors());
        
        //lectura del body
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiRoutes.usuarios, userRoutes);
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando servidor en el puerto:  http://localhost:',this.port);
        })
    }
}


