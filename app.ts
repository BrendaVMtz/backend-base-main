import dotnenv from "dotenv";
import { Server } from './models/server';

dotnenv.config();

const server = new Server();

server.listen();