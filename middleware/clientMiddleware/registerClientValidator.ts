import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

let validatorParams = [
    check('cedula').isLength({ min: 6, max: 15 }).withMessage('La cédula debe tener entre 6 y 15 caracteres.')
    .isNumeric().withMessage('La cédula debe ser un número válido.')
    .bail(),
    check('email').isEmail().withMessage('Debe proporcionar un email válido.')
    .isLength({ max: 100 }).withMessage('El email no debe exceder 100 caracteres.')
    .bail(),
    check('nombre_completo_cliente').isLength({ min: 6, max: 200}).withMessage('Ingrese un nombre válido con mínimo 6 letras y máximo 200').bail(),
    check('direccion').isLength({ min: 5, max: 255}).withMessage('Ingrese una dirección entre 5 a 255 caracteres').bail(),
    check('telefono').isLength({ min: 8, max: 15 }).withMessage('El número de teléfono debe tener entre 8 y 15 caracteres.')
    .isNumeric().withMessage('El número de teléfono debe contener solo números.')
    .bail(),
    check('rut_nit').optional()
    .isLength({ max: 30 }).withMessage('El RUT/NIT no debe exceder 30 caracteres.')
    .bail(),
    check('razon_social').optional()
    .isLength({ max: 100 }).withMessage('La razón social no debe exceder 100 caracteres.')
    .bail(),
    check('estado').isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser "Activo" o "Inactivo".')
    .bail(),
    check('id_zona_de_trabajo').optional() 
    .isInt({ min: 1 }).withMessage('El ID de zona de trabajo debe ser un número entero positivo.')
    .bail()
    ];
        
    
    function validator(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    };
    
    export default {
    validatorParams,
    validator
};