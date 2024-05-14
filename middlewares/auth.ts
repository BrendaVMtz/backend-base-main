

// const jwt = require('jwt')
// const moment = require('moment')


// function isAuth (req, res, next){
//     if(!req.headers.authorization){
//         return res.status(403).send({message: `No tiene autorización`})

//     }

//     //convertir la cabecera de autorizacion en un array
//     //const token = require.headers.authorization.split(" ")[1]
//     //const payload = jwt.decode(token, )
// }

import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Secreto para firmar los tokens JWT (debe ser una cadena segura)
const secretKey = 'mi_secreto_super_seguro';

// Función para generar un token JWT
function generateToken(payload: any): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora
}

// Middleware para verificar el token JWT
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del encabezado de autorización

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        // Si el token es válido, decodificado contendrá la carga útil del token
        //req['user'] = decoded;
        next(); // Continuar con el siguiente middleware
    });
}

// Ejemplo de uso en una ruta protegida
app.get('/ruta-protegida', verifyToken, (req, res) => {
    // Si se llega aquí, significa que el token ha sido verificado correctamente
    // Puedes acceder a la información del usuario desde req.user
    res.json({ message: 'Esta es una ruta protegida', user: req['user'] });
});

// Ejemplo de generación de token
const token = generateToken({ userId: 123 });

console.log('Token JWT generado:', token);
