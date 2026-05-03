import { Request, Response, NextFunction } from "express";

// TODO: Re-enable authentication - Temporarily disabled for development
const checkRoleAndPermission = (roles: string[], isOwnDataAllowed: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // const userRole = req.body.role; // Obtenido del payload del token
        // const userId = req.body.cedula; // ID del colaborador (si es necesario verificar sus propios datos)

        // if (!roles.includes(userRole)) {
        //     res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
        //     return;
        // }

        // // Si `isOwnDataAllowed` es true, verifica que el colaborador solo acceda a sus propios datos
        // if (isOwnDataAllowed && userRole === "COLABORADOR") {
        //     const idColaboradorFromRequest = req.body.cedula || req.params.cedula;

        //     if (idColaboradorFromRequest && userId !== idColaboradorFromRequest) {
        //         res.status(403).json({ error: "No puedes acceder a los datos de otro colaborador" });
        //         return;
        //     }
        // }

        next(); // Allow all requests during development
    };
};

export default checkRoleAndPermission;
