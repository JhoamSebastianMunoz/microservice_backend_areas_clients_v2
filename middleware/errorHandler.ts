import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    code?: string;
    statusCode?: number;
    details?: any;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Errores de base de datos conocidos
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            error: 'Conflicto de datos',
            message: 'El recurso ya existe en la base de datos',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    if (error.code === 'ER_ROW_IS_REFERENCED') {
        return res.status(409).json({
            error: 'Conflicto de integridad',
            message: 'No se puede eliminar el recurso debido a referencias existentes',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            error: 'Referencia inválida',
            message: 'La referencia especificada no existe',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    // Errores de validación (express-validator)
    if (error.name === 'ValidationError') {
        return res.status(422).json({
            error: 'Error de validación',
            message: 'Los datos proporcionados no son válidos',
            details: error.details || error.message
        });
    }

    // Errores de sintaxis JSON
    if (error instanceof SyntaxError && 'body' in error) {
        return res.status(400).json({
            error: 'Error de sintaxis',
            message: 'Formato JSON inválido en el cuerpo de la solicitud',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    // Errores personalizados con statusCode
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            error: error.message || 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.details : undefined
        });
    }

    // Error por defecto
    res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ha ocurrido un error inesperado',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};

export default errorHandler;
