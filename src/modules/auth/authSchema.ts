import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "'email' não é um email válido",
    "any.required": "'email' é obrigatório",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "'password' deve ter pelo menos 8 caracteres",
    "string.max": "'password' deve ter no máximo 20 caracteres",
    "any.required": "'password' é obrigatório",
  }),
});

export const registerSchema = loginSchema;
