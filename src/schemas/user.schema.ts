import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "Nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email no es valido",
    }),
  contrasena: z
    .string({
      required_error: "Contrasena es requerida",
    })
    .min(6, {
      message: "La contrasena debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email no es valido",
    }),
  contrasena: z
    .string({
      required_error: "Contrasena es requerida",
    })
    .min(6, {
      message: "La contrasena debe tener al menos 6 caracteres",
    }),
});
