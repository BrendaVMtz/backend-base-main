import { TOKEN_SECRET } from "../config";
import jwt from "jsonwebtoken";

export function createAccessToken(payload: string | object | Buffer) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            TOKEN_SECRET, 
            { 
                expiresIn: "1d" 
            }, 
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

// export async function createAccessToken(payload: string | object | Buffer) {
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
//       if (err) reject(err);
//       resolve(token);
//     });
//   });
// }