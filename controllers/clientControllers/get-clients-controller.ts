import { Request, Response } from "express";
import DependencyContainer from '../../container/DependencyContainer';
import PaginationParams from '../../Dto/PaginationDto';

let get_clients = async (req: Request, res: Response) => {  
    try {
        const clientService = DependencyContainer.getInstance().clientService;
        
        // Verificar si hay parámetros de paginación
        const { limit, offset, page } = req.query;
        
        if (limit || offset || page) {
            // Usar paginación
            const pagination = PaginationParams.fromQuery(req.query);
            const result = await clientService.getClientsPaginated(pagination);
            
            return res.status(200).json({
                data: result.clients,
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
            const result = await clientService.getClients();
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

    export default get_clients;