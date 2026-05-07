import { Request, Response } from "express";
import DependencyContainer from '../../container/DependencyContainer';

let get_clients = async (req: Request, res: Response) => {  
    try {
        const clientService = DependencyContainer.getInstance().clientService;
        const result = await clientService.getClients()
        return res.status(200).json(result);
        } catch (error: any) {    
            if (error && error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ errorInfo: error.sqlMessage });
            } else {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        }
    };

    export default get_clients;