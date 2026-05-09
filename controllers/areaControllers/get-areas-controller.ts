import { Request, Response } from "express";
import DependencyContainer from '../../container/DependencyContainer';
import PaginationParams from '../../Dto/PaginationDto';

let get_Areas = async (req: Request, res: Response) => {  
    try {
        const areaService = DependencyContainer.getInstance().areaService;
        
        // Verificar si hay parámetros de paginación
        const { limit, offset, page } = req.query;
        
        if (limit || offset || page) {
            // Usar paginación
            const pagination = PaginationParams.fromQuery(req.query);
            const result = await areaService.getAreasPaginated(pagination);
            
            return res.status(200).json({
                data: result.areas,
                pagination: {
                    total: result.total,
                    limit: pagination.limit,
                    offset: pagination.offset,
                    page: pagination.page,
                    totalPages: Math.ceil(result.total / pagination.limit)
                }
            });
        } else {
            // Usar método existente sin paginación
            const result = await areaService.getAreas();
            return res.status(200).json(result);
        }
        } catch (error: any) {    
            if (error && error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ errorInfo: error.sqlMessage });
            } else {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        }
    };

    export default get_Areas;