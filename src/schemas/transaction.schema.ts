import { z } from "zod";

export const createTransactionSchema = z.object({
  balance_fecha: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Debe ser una fecha en formato "YYYY-MM-DD"',
    }),
  id_cuenta_debe: z
    .number({
      required_error: "Cuenta 'debe' requerida",
    })
    .int()
    .positive(),
  id_cuenta_haber: z
    .number({
      required_error: "Cuenta 'haber' requerida",
    })
    .int()
    .positive(),
  cantidad: z.number().int().positive(),
});
