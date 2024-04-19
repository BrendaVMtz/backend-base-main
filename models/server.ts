import  express, {Application} from "express";
import userRoutes from '../routes/usuarios.routers'

export class Server {
    private app: Application;
    private port: string;
    private apiRoutes = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.routes();
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


