import { Role } from "@prisma/client";
import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "'email' deve ser uma string",
    "string.email": "'email' não é um email válido",
    "any.required": "'email' é obrigatório",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.base": "'password' deve ser uma string",
    "string.min": "'password' deve ter pelo menos 8 caracteres",
    "string.max": "'password' deve ter no máximo 20 caracteres",
    "any.required": "'password' é obrigatório",
  }),
  role: Joi.string()
    .valid(...Object.values(Role))
    .optional()
    .messages({
      "string.base": "'role' deve ser uma string",
      "any.only": "'role' deve ser uma função válida",
    }),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.base": "'email' deve ser uma string",
    "string.email": "'email' não é um email válido",
  }),
  password: Joi.string().min(8).max(20).optional().messages({
    "string.base": "'password' deve ser uma string",
    "string.min": "'password' deve ter pelo menos 8 caracteres",
    "string.max": "'password' deve ter no máximo 20 caracteres",
  }),
  role: Joi.string()
    .valid(...Object.values(Role))
    .optional()
    .messages({
      "string.base": "'role' deve ser uma string",
      "any.only": "'role' deve ser uma função válida",
    }),
});
