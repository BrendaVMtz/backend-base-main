import dotnenv from "dotenv";
import express  from "express";
import { Server } from './models/server';


const app = express;
dotnenv.config();

app.use(express.json())
app.use('/usuarios',)

app.listen(8000,()=>{
    console.log('servidor funcionando en el puerto: 8000')
})